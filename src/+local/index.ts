import type { Authorize, Candle, OHLC, Proposal } from "types"

interface Compras {
  start1?: number
  start2?: number
  tick_stream?: { tick: number; epoch: number }[]
}

export const state = {
  activeAccount: 0,
  deriv: [] as { acct: any; cur: any; token: any }[],
  authorize: {} as Authorize,
  isAuthorized: false,

  internal: {
    contract_type: "",

    multiplicador_del_balance_a_usar: 0.00175,

    initial_amount: 0.35,
    amount: 0.35,

    max_loss_count: 8,

    multiplicador1: 2.24,
    multiplicador2: 2.24,
    multiplicador3: 2.24,

    can_buy: false,
    el_arranque_de_compra: true
  },

  config: {
    buy_with_proposal: true
  },

  logs: {
    show_message_logs: false,
    show_open_logs: false,
    show_send_logs: false,
    show_close_logs: true,
    show_error_logs: true
  },

  candles: [] as Candle[],

  ohlc: {} as OHLC,

  lists: {
    close_prices: [] as number[],
    high_prices: [] as number[],
    low_prices: [] as number[],
    open_prices: [] as number[],

    compras: {
      ids: [] as string[],
      history: {} as {
        [id: string]: {
          active: boolean
          tick: number
          gano: boolean
        }
      }[]
    },

    ticks: [] as any[]
  },

  proposals: {
    CALL: {} as Proposal,
    PUT: {} as Proposal
  },

  permisos: {
    iniciar: false,
    guardar: false,
    reiniciar: false
  },

  analista: {
    analizar: false
  },

  observador: {
    observar: false
  },

  habilitado_a_comprar: false,

  WebSockets: {
    observador: <WebSocket | undefined>undefined,
    comprador: <WebSocket | undefined>undefined
  },

  grafica: {
    compras: [] as {
      tick: number
      type: "start" | "inprocess" | "won" | "lost" | "open" | "ni idea"
    }[]
  },

  comprador: {
    is_proposal_ready: false
  }
}

export type State = typeof state

export const play = () => {
  state.habilitado_a_comprar = true
}

export const pausa = () => {
  state.habilitado_a_comprar = false
}

export const stop = () => {
  state.habilitado_a_comprar = false
}
