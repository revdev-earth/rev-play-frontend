import { state } from "+local"
import { store } from "+redux"
import { buy_with_proposal } from "sockets/buyer/sends"
import { SMA } from "technicalindicators"

// Listen for messages
export const message = (messageEvent: MessageEvent<string>) => {
  //

  const data = JSON.parse(messageEvent.data)

  if (data.error) console.log("socket observer ticks message : ", data)

  const { msg_type } = data

  switch (msg_type) {
    case "forget_all":
      break

    case "history":
      set_history(data)
      break

    case "tick":
      update_ticks(data)
      break

    default:
      console.log(":: socket observer ticks message default : ", data)
      break
  }
}

const set_history = (data: {
  echo_req: any
  msg_type: "history"
  pip_size: number // 2,
  subscription: {
    id: string // "adab59d9-a81b-6b1f-9f32-a6967d6e13b8"
  }
  history: {
    prices: number[]
    times: number[]
  }
}) => {
  state.lists.ticks = data.history.prices
}

interface SMA_ {
  period: number
  price: number[]
  generator: {}
  result: number[]
}

const update_ticks = (data: {
  echo_req: any
  msg_type: "tick"
  subscription: {
    id: string // "adab59d9-a81b-6b1f-9f32-a6967d6e13b8"
  }
  tick: {
    ask: number // 598659.53
    bid: number // 598579.53
    epoch: number // 1692522645
    id: string // "e7739a1d-a698-fa4b-7cdf-d5ac0f2c0490"
    pip_size: number // 2
    quote: number // 598619.53
    symbol: string // "1HZ50V"
  }
}) => {
  state.lists.ticks.shift()
  state.lists.ticks = [...state.lists.ticks, data.tick.quote]

  const sma = new SMA({
    period: store.getState().editables.sma,
    values: state.lists.ticks
  }) as SMA_

  const sma1 = sma.result[0]
  const sma2 = sma.result[1]

  if (sma1 > sma2) {
    state.internal.contract_type = "CALL"
  } else if (sma1 < sma2) {
    state.internal.contract_type = "PUT"
  } else {
    state.internal.contract_type = ""
  }

  const { internal, config } = state

  if (state.habilitado_a_comprar) {
    if (internal.contract_type.length > 0) {
      if (config.buy_with_proposal && state.comprador.is_proposal_ready) {
        buy_with_proposal()
      }
    }
  }
}
