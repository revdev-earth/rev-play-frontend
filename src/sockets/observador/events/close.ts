import { state } from "+local"

export const close = (event: Event) => {
  if (state.logs.show_error_logs) {
    console.log(":: socket ticks closed : ", event)
    console.log(JSON.stringify(event, null, 2))

    setTimeout(() => {
      location.reload()
    }, 1000)
  }
}
