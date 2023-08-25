import { state } from "+local"
import connect from "sockets/observer_candles"

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket observer closed : ", { event })
  }
  if (state.reconnect) connect()
}
