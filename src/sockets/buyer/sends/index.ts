import { store } from "+redux"

import { state } from "+local"
import { Contract_type, Proposal } from "types"
// Funciones que iremos usando en el tiempo

// aqui vamos a poder enviar la data
// sin que tengamos que escribir todo lo mismo una y otra vez
export const send = (data: Object) => {
  if (state.logs.show_send_logs) console.log(":: socket buyer send : ", data)
  if (typeof state.WebSockets.comprador === "undefined")
    return console.log(" state.WebSockets.comprador not defined", data)
  state.WebSockets.comprador.send(JSON.stringify(data))
}

export const send_time = () => {
  send({
    time: 1
  })
}

export const send_time_repet = () => {
  setInterval(() => {
    send_time()
  }, 30 * 1000)
}

// autorizacion
export const authorization = () => {
  send({
    authorize:
      store.getState().access.deriv[store.getState().editables.actual_account]
        .token
  })
}

let min_amount = 0.35
export const make_proposals = () => {
  if (state.internal.amount < min_amount) {
    console.log(" > Case study amount :", state.internal.amount)
  }

  const common_proposal = {
    subscribe: 1,
    proposal: 1,
    amount:
      state.internal.amount < min_amount ? min_amount : state.internal.amount,
    duration: store.getState().editables.duration,
    duration_unit: store.getState().editables.duration_unit,
    currency: store.getState().editables.currency,
    symbol: store.getState().editables.symbol
  }
  const basis_payout = {
    basis: "payout"
  }
  const basis_strake = {
    basis: "stake"
  }
  const proposal_call = {
    contract_type: "CALL",
    ...common_proposal,
    ...basis_strake
  }
  const proposal_put = {
    contract_type: "PUT",
    ...common_proposal,
    ...basis_strake
  }
  send(proposal_call)
  send(proposal_put)
}

export const forget_all = () => {
  const data = { forget_all: ["proposal"] }
  send(data)
}

export const buy_with_proposal = () => {
  state.internal.can_buy = false

  const contract_type = state.internal.contract_type as Contract_type

  if (
    !state.proposals[contract_type].id ||
    !state.proposals[contract_type].ask_price
  )
    return console.log(`
    no defined...
    buy: ${state.proposals[contract_type].id}
    price: ${state.proposals[contract_type].ask_price}
  `)

  const data = {
    buy: state.proposals[contract_type].id,
    price: state.proposals[contract_type].ask_price
  }

  send(data)

  state.proposals.CALL = {} as Proposal
  state.proposals.PUT = {} as Proposal
  state.comprador.is_proposal_ready = false
}

//

export const forget_and_make_proposal = () => {
  forget_all()
  make_proposals()
}

//

export const subscribe_transactions = () => {
  send({
    proposal_open_contract: 1,
    subscribe: 1
  })
}

// Just buy // not used
export const buy = () => {
  state.internal.can_buy = false

  const { amount, contract_type } = state.internal
  const { symbol } = store.getState().editables

  const parameters = {
    amount: amount,
    symbol: symbol,
    duration: 5,
    duration_unit: "t",
    contract_type: contract_type,
    currency: "USD",
    basis: "stake",
    barrier: "+0.1"
  }

  const purchase_msg = {
    buy: "1",
    price: amount,
    parameters: parameters,
    subscribe: 1
  }

  console.log(":: making purchase for amount : ", amount)

  send(purchase_msg)
}

// logout deriv
export const logoutDeriv = () => {
  send({ logout: 1 })
}
