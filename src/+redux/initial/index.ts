import type { PurchaseRedux } from "types"

export interface Access {
  sessionToken: string
  sessionExpiresIn: number
  api_token: string
  user_token: string

  deriv: { acct: string; cur: string; token: string }[]
}

const initial = {
  info: {
    balance: 0,
    balance_in_use: 0,

    total_profit: 0,
    total_contracts: 0,
    total_loss_contracts: 0,
    total_won_contracts: 0,

    continue_loss_contracts: 0,
    continue_won_contracts: 0,

    position: 1,

    max_position: 1,

    new_amount: 0,

    random_seconds_wait: 1
  },

  purchases: {
    ids: [] as number[],
    items: {} as [key: PurchaseRedux]
  },

  editables: {
    balance_to_use: 200,
    duration_unit: "t",
    duration: 1,
    symbol: "1HZ50V",
    currency: "USD",
    api_token: "",
    actual_account: 0
  },

  access: <Access>{},

  ws: {
    comprador_ready: false
  }
}

export default initial

export type Initial = typeof initial
