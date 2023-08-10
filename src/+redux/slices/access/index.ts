import initial from "+redux/initial"
import { createSlice } from "@reduxjs/toolkit"

// access slice

const access_slice = createSlice({
  name: "access",
  initialState: initial.access,
  reducers: {
    set_session_token: (
      state,
      {
        payload
      }: { payload: { sessionToken: string; sessionExpiresIn: number } }
    ) => ({
      ...state,
      ...payload
    })
  }
})

export const { set_session_token } = access_slice.actions

export const reducer = access_slice.reducer
