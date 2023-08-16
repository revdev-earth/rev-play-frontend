import initial, { Access } from "+redux/initial"
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
    }),
    set_deriv: (state, { payload }: { payload: Access["deriv"] }) => ({
      ...state,
      deriv: payload
    })
  }
})

export const { set_session_token, set_deriv } = access_slice.actions

export const reducer = access_slice.reducer
