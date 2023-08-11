import { state } from "+local"
import { connect } from ".."

export const error = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket ticks tiene un error : ", event)
    console.log(JSON.stringify(event, null, 2))
  }
}
