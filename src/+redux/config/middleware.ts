import { debounce } from "lodash"
import { Middleware } from "@reduxjs/toolkit"
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"
import logger from "redux-logger"

import { State } from "+redux"
import initial, { Initial } from "+redux/initial"

// middleware

const writeLocalStorage: Middleware = (store) => {
  const debouncedSetItem = debounce(
    localStorage.setItem.bind(window.localStorage),
    250
  )

  return (next) => (action) => {
    const result = next(action)
    // console.log({ action })
    // if (action.type.match("editables")) console.log(action)
    // if (action.type.match("info")) console.log(action)
    // if (action.type.match("purchases")) console.log(action)
    // if (action.type.match("access")) console.log(action)
    const state = store.getState() as State

    debouncedSetItem(
      "state",
      JSON.stringify({ state: { ...state, ws: initial.ws } })
    ) // Use the debounced function
    return result
  }
}

const isSafari = /Safari/i.test(navigator.userAgent)
const showLogs = false

export default (run: CurriedGetDefaultMiddleware<Initial>) => {
  if (isSafari && import.meta.env.DEV && showLogs)
    return run().concat(logger).concat(writeLocalStorage)

  return run().concat(writeLocalStorage)
}
