import { createSlice } from "@reduxjs/toolkit"

import initial from "+redux/initial"

const info_slice = createSlice({
  name: "info",
  initialState: initial.info,
  reducers: {
    rewrite_info: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
})

export const { rewrite_info } = info_slice.actions

export const reducer = info_slice.reducer
