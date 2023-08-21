import { state } from "+local"

export const error = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket observador ticks tiene un error : ", { event })
  }
}
