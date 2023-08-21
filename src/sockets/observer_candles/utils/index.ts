import { buy, buy_with_proposal } from "../../buyer/sends"
import { state } from "+local"
import { Candle } from "types"

import { SMA } from "technicalindicators"
interface CandleAddCandle {
  close: number | string
  epoch: number | string
  high: number | string
  low: number | string
  open: number | string
}

export const remove_first_candle = () => {
  state.lists.close_prices.shift()
  state.lists.high_prices.shift()
  state.lists.low_prices.shift()
  state.lists.open_prices.shift()
}

export const add_candle = (candle: CandleAddCandle) => {
  state.lists.close_prices.push(Number(candle.close))
  state.lists.high_prices.push(Number(candle.high))
  state.lists.low_prices.push(Number(candle.low))
  state.lists.open_prices.push(Number(candle.open))
}

export const add_candles = (candles: Candle[]) => {
  candles.forEach((candle) => {
    add_candle(candle)
  })
}

interface SMA_ {
  period: number
  price: number[]
  generator: {}
  result: number[]
}

export const calculate_indicators = () => {
  // console.log(":: calculate_indicators");

  const { close_prices: values } = state.lists

  const sma = new SMA({ period: 14, values }) as SMA_

  const sma1 = sma.result[0]
  const sma2 = sma.result[1]

  if (sma1 > sma2) {
    state.internal.contract_type = "CALL"
  } else if (sma1 < sma2) {
    state.internal.contract_type = "PUT"
  } else {
    state.internal.contract_type = ""
  }
}

export const analysis = () => {
  // console.log(":: analysis")

  calculate_indicators()

  const { internal, config } = state

  if (state.habilitado_a_comprar) {
    if (internal.contract_type.length > 0) {
      config.buy_with_proposal &&
        state.comprador.is_proposal_ready &&
        buy_with_proposal()

      // !config.buy_with_proposal && buy()
    }
  }
}
