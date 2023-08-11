import { state } from "+local"

export const error = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket ticks tiene un error : ", event)
    console.log(JSON.stringify(event, null, 2))

    setTimeout(() => {
      location.reload()
    }, 1000)
  }
}
