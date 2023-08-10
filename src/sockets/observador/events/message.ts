import { state } from "+local"
import type { Data, CandlesData, OHLCData } from "types"
import {
  add_candle,
  add_candles,
  analysis,
  remove_first_candle
} from "../utils"

// Listen for messages
export const message = (messageEvent: MessageEvent<string>) => {
  // console.log(":: socket message : ", messageEvent);

  const data = JSON.parse(messageEvent.data) as Data

  if (data.error) console.log("socket ticks message : ", data)

  /* if (state.logs.show_message_logs)
    console.log(":: socket message data : ", data); */

  // variable que tenemos que usar
  const { msg_type } = data

  switch (msg_type) {
    case "candles":
      candles(data as CandlesData)
      break

    case "ohlc":
      ohlc(data as OHLCData)
      break

    case "time":
      time(data as Data)
      break

    default:
      console.log(":: socket ticks message default : ", data)
      break
  }
}

// arrow functions

const candles = (data: CandlesData) => {
  // console.log(":: candles : ", data);

  state.candles = data.candles

  add_candles(data.candles)
}

const ohlc = (data: OHLCData) => {
  // console.log(":: ohlc", data);

  state.ohlc = data.ohlc

  remove_first_candle()

  add_candle(data.ohlc)

  analysis()
}

const time = (data: Data) => {
  // console.log(":: time", data);
}
