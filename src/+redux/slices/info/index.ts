import { createSlice } from "@reduxjs/toolkit"

import initial from "+redux/initial"

const info_slice = createSlice({
  name: "info",
  initialState: initial.info,
  reducers: {
    rewrite_info: (state, action) => ({
      ...state,
      ...action.payload
    }),

    clean_info: () => initial.info
  }
})

export const { rewrite_info, clean_info } = info_slice.actions

export const reducer = info_slice.reducer
