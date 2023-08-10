import { createSlice } from "@reduxjs/toolkit"

import initial from "+redux/initial"

// editables slice

const editables_slice = createSlice({
  name: "editables",
  initialState: initial.editables,
  reducers: {
    rewrite_editables: (state, { payload }) => ({
      ...state,
      ...payload
    })
  }
})

export const { rewrite_editables } = editables_slice.actions

export const reducer = editables_slice.reducer
