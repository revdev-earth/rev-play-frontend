import { store } from "+redux"
import { state } from "+local"
import type {
  Data,
  AuthorizeData,
  BuyData,
  AddPurchaseRedux,
  ProposalData,
  ProposalOpenContract
} from "types"
import { compact, isEmpty } from "lodash"
import {
  forget_and_make_proposal,
  make_proposals,
  subscribe_transactions
} from "../sends"
import { set_amounts } from "../utils"
import { rewrite_info } from "+redux/slices/info"
import { add_purchase, rewrite_purchase } from "+redux/slices/purchases"
import { numFix } from "utils"
// import { convertidor_de_hora } from "utils"

const intial_track_contract = {
  entry_spot: undefined as number | undefined,
  exit_tick: undefined as number | undefined
}

let actual_track_contract = intial_track_contract

// Messages
export const message = (messageEvent: MessageEvent<string>) => {
  // console.log(":: socket message : ", messageEvent);

  const data: Data = JSON.parse(messageEvent.data)

  // console.log(data.msg_type)
  // console.log(data)

  if (data.error) console.log("socket buyer error message : ", { data })

  // console.log(":: socket buyer data : ", data);
  if (state.logs.show_message_logs) console.log(":: socket buyer message", data)

  const { msg_type } = data

  switch (msg_type) {
    case "authorize":
      authorize(data as AuthorizeData)
      break

    case "proposal_open_contract":
      const { proposal_open_contract: contract } = data

      if (isEmpty(contract) || !contract) return

      const { entry_spot, exit_tick, is_sold } = contract

      if (entry_spot && !actual_track_contract.entry_spot) {
        actual_track_contract.entry_spot = entry_spot
        state.grafica.compras.push({
          tick: entry_spot,
          type: "start"
        })
      }

      if (exit_tick && !actual_track_contract.exit_tick) {
        actual_track_contract.exit_tick = exit_tick
        const type = contract.profit > 0 ? "won" : "lost"
        state.grafica.compras.push({
          tick: exit_tick,
          type
          // type: status as "won" | "lost" | "open" | "ni idea"
        })
      }

      if (is_sold) {
        actual_track_contract.entry_spot = undefined
        actual_track_contract.exit_tick = undefined
      }

      proposal_open_contract(contract)
      break

    case "buy":
      buy(data as BuyData)
      break

    case "forget_all":
      forget_all(data as Data)
      break

    case "proposal":
      proposal(data as ProposalData)
      break

    case "time":
      time(data)
      break

    default:
      console.log(":: socket buyer message default : ", data)
      break
  }
}

const authorize = (data: AuthorizeData) => {
  // console.log(":: authorize : ", { data })

  if (data.error) {
    window.location.replace("/")
    return console.log(":: authorize : ", { data })
  }

  state.authorize = data.authorize

  state.isAuthorized = true

  store.dispatch(rewrite_info({ balance: numFix(data.authorize.balance) }))

  subscribe_transactions()

  const { buy_with_proposal } = state.config

  if (buy_with_proposal) make_proposals()
  if (!buy_with_proposal) state.internal.can_buy = false
}

let list_contracts_running = [] as number[]

const proposal_open_contract = (
  proposal_open_contract: ProposalOpenContract
) => {
  const {
    contract_id,
    buy_price,
    is_sold,
    payout,
    profit,
    profit_percentage,
    sell_price,
    status,
    contract_type
  } = proposal_open_contract

  //

  const exist_contract_id = list_contracts_running.some(
    (contract_id_from_list) => contract_id_from_list === contract_id
  )

  if (!exist_contract_id)
    list_contracts_running = compact([...list_contracts_running, contract_id])

  //

  const data_for_update_purchase = {
    contract_id,
    buy_price,
    is_sold,
    payout,
    profit,
    profit_percentage,
    sell_price,
    status,
    contract_type,
    position: store.getState().info.position
  }

  store.dispatch(rewrite_purchase(data_for_update_purchase))

  if (proposal_open_contract.is_sold) {
    sold_function(proposal_open_contract)
  }
}

const buy = (data: BuyData) => {
  const { contract_id, buy_price, payout, balance_after } = data.buy

  const purchase: AddPurchaseRedux = {
    contract_id,
    buy_price,
    payout
  }

  store.dispatch(add_purchase(purchase))

  store.dispatch(rewrite_info({ balance: numFix(balance_after) }))
}

const proposal = (data: ProposalData) => {
  const {
    echo_req: { contract_type },
    proposal
  } = data

  if (contract_type === "CALL") {
    state.proposals.CALL = proposal
  }

  if (contract_type === "PUT") {
    state.proposals.PUT = proposal
  }

  if (!isEmpty(state.proposals.CALL) && !isEmpty(state.proposals.PUT)) {
    state.buyer.is_proposal_ready = true
  }

  if (state.internal.el_arranque_de_compra) {
    state.internal.el_arranque_de_compra = false
    state.internal.can_buy = true
  }
}

const forget_all = (data: Data) => {}

const time = (data: Data) => {}

// # Functions

// sold functions is used in proposal_open_contract
const sold_function = ({
  contract_id,
  profit,
  status,
  sell_price
}: ProposalOpenContract) => {
  let info = { ...store.getState().info }

  const {
    max_loss_count,
    multiplicador1,
    multiplicador2,
    multiplicador3,
    amount
  } = state.internal

  const total_profit = numFix(info.total_profit + profit)

  info.total_profit = total_profit
  info.total_contracts++

  if (status === "lost") {
    info.continue_won_contracts = 0
    info.total_loss_contracts++
    info.continue_loss_contracts++
    info.position++

    state.info.total_lost = numFix(amount + state.info.total_lost)
    state.info.accumulate_lost = numFix(amount + state.info.accumulate_lost)

    const { continue_loss_contracts, position, max_position } = info

    if (position > max_position) info.max_position = position

    if (continue_loss_contracts < max_loss_count) {
      let new_amount = "0"

      if (continue_loss_contracts < 3) {
        new_amount = (amount * multiplicador1).toFixed(2)
      }

      if (continue_loss_contracts >= 3) {
        new_amount = (amount * multiplicador2).toFixed(2)
      }

      if (continue_loss_contracts >= 6) {
        new_amount = (amount * multiplicador3).toFixed(2)
      }

      state.internal.amount = Number(new_amount)
      info.new_amount = Number(new_amount)
    } else {
      console.log(":: limite alcanzado : ", max_loss_count)
    }
  }

  if (status === "won") {
    info.continue_won_contracts++
    info.total_won_contracts++
    info.continue_loss_contracts = 0
    info.position = 1

    info.balance = numFix(store.getState().info.balance + sell_price)

    state.info.total_win = numFix(sell_price + state.info.total_win)
    state.info.win_without_lost = numFix(
      sell_price - (state.info.accumulate_lost + amount)
    )

    state.info.credit_left =
      state.info.credit_left - state.info.win_without_lost * 0.1

    state.info.accumulate_lost = 0

    state.info.total_won_app = numFix(state.info.total_win * 0.02)

    set_amounts()
  }

  console.log(state.info)

  store.dispatch(rewrite_info(info))

  list_contracts_running = list_contracts_running.filter(
    (contract_id_from_list) => contract_id_from_list !== contract_id
  )

  if (list_contracts_running.length > 0) return

  const nueva_compra = info.max_position <= max_loss_count

  if (nueva_compra) {
    forget_and_make_proposal()
    state.buyer.is_proposal_ready = false

    // const random_seconds_wait = random(1, 10)

    // store.dispatch(rewrite_info({ random_seconds_wait }))

    // setTimeout(() => {
    //   state.internal.can_buy = true
    // }, random_seconds_wait * 1000)
  }
}
