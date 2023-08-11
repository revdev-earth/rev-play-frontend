import { state } from "+local"
import connect from "sockets/comprador"

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket comprador closed : ", { event })
  }
  connect()
}
