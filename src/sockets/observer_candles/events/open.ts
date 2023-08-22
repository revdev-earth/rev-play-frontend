import { state } from "+local"
import { send_time_repet, subscribe_ohcl_with_history } from "../sends"

// Connection opened
export const open = (event: Event) => {
  if (state.logs.show_open_logs)
    console.log(":: socket observer open : ", event)

  send_time_repet()

  subscribe_ohcl_with_history()
}
