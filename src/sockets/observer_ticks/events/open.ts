import { state } from "+local"
import { subscribe_history } from "../sends"

// Connection opened
export const open = (event: Event) => {
  if (state.logs.show_open_logs)
    console.log(":: socket observer open : ", event)

  subscribe_history()
}
