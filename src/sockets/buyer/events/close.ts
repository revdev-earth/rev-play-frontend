import { state } from "+local"
import { store } from "+redux"
import { set_ready } from "+redux/slices/ws"
import connect from "sockets/buyer"

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    store.dispatch(set_ready(false))
    console.log(":: socket buyer closed : ", { event })
  }
  connect()
}
