import type { TypedUseSelectorHook } from "react-redux"

// defaults from redux

import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from "react-redux"

import config from "./config"

// Provider

export { default as Provider } from "+redux/Provider"

// store

export const store = config

export type State = ReturnType<typeof store.getState>

// Hooks

export const useDispatch = () => useReduxDispatch<typeof store.dispatch>()
export const useSelector: TypedUseSelectorHook<State> = useReduxSelector
