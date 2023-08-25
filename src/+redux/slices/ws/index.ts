import initial from "+redux/initial"
import { createSlice } from "@reduxjs/toolkit"

// ws slice

const ws_slice = createSlice({
  name: "ws",
  initialState: initial.ws,
  reducers: {
    set_ready: (state, { payload }: { payload: boolean }) => ({
      ...state,
      buyer_ready: payload
    })
  }
})

export const { set_ready } = ws_slice.actions
export const reducer = ws_slice.reducer
