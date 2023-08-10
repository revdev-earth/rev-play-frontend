enum MessageType {
  candles = "candles"
}

interface Subscription {
  id: string // "a58a6ab7-b40f-3249-eee0-984773c1a3da"
}

export interface Response {
  echo_req: RequestCandles | RequestTicks
  pip_size: number // 4
}

// Responses

export interface Candle {
  close: string // 194.9594
  epoch: string // 1679382000
  high: string // 195.0656
  low: string // 193.2472
  open: string // 194.0493
}

export interface ResponseCandles extends Response {
  candles: Candle[]
  subscription?: Subscription
}

export interface History {
  prices: number[] // [ 197.006, 196.9795, 196.982]
  times: number[] //  [ 1679411578, 1679411580, 1679411582 ]
}

export interface ResponseHistory extends Response {
  msg_type: "history"
  history: History
}

export interface Tick {
  ask: number // 197.4723
  bid: number // 197.4523
  epoch: number // 1679429504
  id: string // "4502024b-7840-4eee-aca4-78376c6f1d92"
  pip_size: number // 4
  quote: number // 197.4623
  symbol: string // "R_50"
}

export interface ResponseTick extends Response {
  msg_type: "tick"
  tick: Tick
}

// Requests

interface RequestHistory {
  ticks_history: string // "R_50",
  count: number // 10

  end: string // "latest",
  start: number // 1,

  adjust_start_time?: number // 1
  subscribe?: number // 1
}

export interface RequestCandles extends RequestHistory {
  style: "candles"
  granularity: number // 60 * 60,
}

export interface RequestTicks {
  style: "ticks"
}
