import { state } from "+local"
import connect from "sockets/comprador"

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket comprador closed : ", event)
    console.log(JSON.stringify(event, null, 2))

    // setTimeout(() => { location.reload() }, 1000)
  }
  connect()
}
