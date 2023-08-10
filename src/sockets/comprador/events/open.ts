import { state } from "+local"
import { authorization, send_time_repet } from "../sends"
import { set_amounts } from "../utils"

// Connection opened
export const open = (event: Event) => {
  if (state.logs.show_open_logs)
    console.log(":: socket comercial open : ", event)

  set_amounts()

  send_time_repet()

  authorization()
}
