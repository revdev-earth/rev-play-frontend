// socket message
export interface Data {
  msg_type: string
  echo_req: any

  [key: string]: any

  authorize?: Authorize

  proposal_open_contract?: ProposalOpenContract
}

// interfaces used in socket for Authorize

export interface Account {
  account_type: string
  created_at: number
  currency: string
  is_disabled: number
  is_virtual: number
  landing_company_name: string
  loginid: string
  trading: {}
}

export interface Authorize {
  account_list: [Account]
  balance: number
  country: string
  currency: string
  email: string
  fullname: string
  is_virtual: number
  landing_company_fullname: string
  landing_company_name: string
  local_currencies: {}
  loginid: string
  preferred_language: string
  scopes: [string]
  trading: {}
  upgradeable_landing_companies: [string]
  user_id: number
}

export interface AuthorizeData {
  authorize: Authorize
  echo_req: {
    authorize: string
  }
  msg_type: string
  error?: {
    code: string
    details: Object
    message: string
  }
}

// interfaces used in socket for ohlc

export interface Candle {
  close: number
  epoch: number
  high: number
  low: number
  open: number
}

export interface EchoRequestCandles {
  adjust_start_time: number
  count: number
  end: string
  start: number
  style: string
  subscribe: number
  ticks_history: string
}
export interface CandlesData {
  candles: [Candle]
  echo_req: EchoRequestCandles
  msg_type: string
  pip_size: number
  subscription: {
    id: string
  }
}

// ohlc

export interface EchoRequestOHLC extends EchoRequestCandles {
  granularity: number
}

export interface OHLC {
  close: string
  epoch: number
  granularity: number
  high: string
  id: string
  low: string
  open: string
  open_time: number
  pip_size: number
  symbol: string
}

export interface OHLCData {
  echo_req: EchoRequestOHLC
  msg_type: "ohlc"
  ohlc: OHLC
  subscription: {
    id: string
  }
}

// pruchase

interface TickAudit {
  epoch: number // 1683114883
  flag?: string // "highlight_time"
  name?: string // "Start Time" || "Entry Spot" || "End Time and Exit Spot"
  tick: number // 809137.64
  tick_display_value: string // "809137.64"
}

interface TickStream {
  epoch: number // 1683114883
  tick: number // 809137.64
  tick_display_value: string // "809137.64"
}

export interface ProposalOpenContract {
  account_id: number // 44820648
  audit_details: {
    all_ticks: TickAudit[]
  }
  barrier: string // "809024.92"
  barrier_count: number // 1
  bid_price: number // 0
  buy_price: number // 0.35
  contract_id: number // 206333966248
  contract_type: string // "PUT"
  currency: string // "USD"
  current_spot: number // 809021.28
  current_spot_display_value: string // "809021.28"
  current_spot_time: number // 1683114886
  date_expiry: number // 1683114885
  date_settlement: number // 1683114885
  date_start: number // 1683114883
  display_name: string // "Volatility 50 (1s) Index"
  entry_spot: number // 809024.92
  entry_spot_display_value: string // "809024.92"
  entry_tick: number // 809024.92
  entry_tick_display_value: string // "809024.92"
  entry_tick_time: number // 1683114884
  exit_tick: number // 809027.57
  exit_tick_display_value: string // "809027.57"
  exit_tick_time: number // 1683114885
  expiry_time: number // 1683114885
  id: string // "c5a43d2c-5b0e-eaa3-b16d-69e99f5ac85b"
  is_expired: number // 1
  is_forward_starting: number // 0
  is_intraday: number // 1
  is_path_dependent: number // 0
  is_settleable: number // 1
  is_sold: number // 1
  is_valid_to_cancel: number // 0
  is_valid_to_sell: number // 0
  longcode: string // "Win payout if Volatility 50 (1s) Index after 1 tick is strictly lower than entry spot."
  payout: number // 0.66
  profit: number // -0.35
  profit_percentage: number // -100
  purchase_time: number // 1683114883
  sell_price: number // 0
  sell_spot: number // 809027.57
  sell_spot_display_value: string // "809027.57"
  sell_spot_time: number // 1683114885
  sell_time: number // 1683114886
  shortcode: string // "PUT_1HZ50V_0.66_1683114883_1T_S0P_0"
  status: string // "lost"
  tick_count: number // 1
  tick_stream: TickStream[]
  transaction_ids: {
    buy: number // 411776653488
    sell: number // 411776659728
  }
  underlying: string // "1HZ50V"
  validation_error: string // "This contract has been sold."
  validation_error_code: string // "General"
}

export interface ProposalOpenContractData {
  echo_req: {
    contract_id: string // "196695917568";
    proposal_open_contract: number // 1;
    subscribe: number // 1;
  }
  msg_type: "proposal_open_contract"
  proposal_open_contract: ProposalOpenContract
  subscription: {
    id: string // "6ce0ad79-0561-636c-bd3f-3b5c73bb6ccd";
  }
}

export interface Buy {
  balance_after: number // 20710.55;
  buy_price: number // 0.35;
  contract_id: number // 196710401968;
  longcode: string // "Win payout if Volatility 25 Index after 5 ticks is strictly lower than entry spot plus 0.100.";
  payout: number // 0.5;
  purchase_time: number // 1674685542;
  shortcode: string // "PUT_R_25_0.50_1674685542_5T_S100P_0";
  start_time: number // 1674685542;
  transaction_id: number // 392657569928;
}
export interface EchoRequestBuy {
  buy: string // "1";
  parameters: {
    amount: number // 0.35;
    app_markup_percentage: string // "0";
    barrier: string // "+0.1";
    basis: string // "stake";
    contract_type: string // "PUT";
    currency: string // "USD";
    duration: number // 5;
    duration_unit: string // "t";
    symbol: string // "R_25";
  }
  price: number // 0.35;
  subscribe: number // 1;
}

export interface BuyData {
  buy: Buy
  echo_req: EchoRequestBuy
  msg_type: "buy"
  subscription: {
    id: string // "3bd99bd3-e24a-efd7-4a6f-fb42f94cf4c6";
  }
}

// Redux

export interface AddPurchaseRedux {
  contract_id: number
  buy_price: number
  payout: number
}

export interface PurchaseRedux extends AddPurchaseRedux {
  [key: string]: any
  is_sold?: number
  profit?: number
  profit_percentage?: number
  sell_price?: number
  status?: string
  contract_type?: string
  position?: number
}

// Proposal

interface EchoRequestProposal {
  amount: number // 10;
  basis: string // "payout";
  contract_type: string //  "PUT";
  currency: string //  "USD";
  duration: number // 5;
  duration_unit: string // "t";
  product_type: string // "basic";
  proposal: number // 1;
  subscribe: number //  1;
  symbol: string // "1HZ100V";
}

export interface Proposal {
  ask_price: number //  5.12;
  date_expiry: number //  1674692799;
  date_start: number //  1674692794;
  display_value: string // "5.12";
  id: string // "a5585821-cf7a-9b62-9b8f-5eb81592a1de";
  longcode: string // "Win payout if Volatility 100 (1s) Index after 5 ticks is strictly lower than entry spot.";
  payout: number // 10;
  spot: number //  858.09;
  spot_time: number //  1674692793;
}

export interface ProposalData {
  echo_req: EchoRequestProposal
  msg_type: string // "proposal";
  proposal: Proposal
  subscription: {
    id: string // "a5585821-cf7a-9b62-9b8f-5eb81592a1de";
  }
}

export type Contract_type = "CALL" | "PUT"
