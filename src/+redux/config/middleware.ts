import { debounce } from "lodash"
import { Initial } from "+redux/initial"
import { Middleware } from "@reduxjs/toolkit"
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"
import logger from "redux-logger"
import { State } from "+redux"

// middleware

// Verificar si el navegador es Safari
const isSafari = /Safari/i.test(navigator.userAgent)

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

    debouncedSetItem("state", JSON.stringify({ state })) // Use the debounced function
    return result
  }
}
// localStorageMiddleware
export const localStorageMiddleware = debounce(writeLocalStorage, 1000)

export default (run: CurriedGetDefaultMiddleware<Initial>) => {
  if (isSafari && import.meta.env.DEV)
    return run().concat(logger).concat(writeLocalStorage)
  return run().concat(writeLocalStorage)
}
