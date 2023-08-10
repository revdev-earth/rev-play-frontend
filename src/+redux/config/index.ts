import { configureStore } from "@reduxjs/toolkit"
import reducer from "+redux/reducer"

import initial from "+redux/initial"
import middleware from "./middleware"
import enhancers from "./enhancers"

const preloadedState = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state")!).state
  : initial

export default configureStore({
  reducer,
  devTools: import.meta.env.DEV,
  preloadedState,
  middleware,
  enhancers
})
