import { createSlice } from "@reduxjs/toolkit"
import { AddPurchaseRedux, PurchaseRedux } from "types"
import initial from "+redux/initial"

// purchase slice

const purchases_slice = createSlice({
  name: "purchases",
  initialState: initial.purchases,
  reducers: {
    add_purchase: (state, { payload }: { payload: AddPurchaseRedux }) => {
      state.ids.push(payload.contract_id)
      state.items[payload.contract_id] = payload
    },

    rewrite_purchase: (state, { payload }: { payload: PurchaseRedux }) => {
      state.items = {
        ...state.items,
        [payload.contract_id]: payload
      }
    },

    clean_purchases: () => initial.purchases
  }
})

export const { add_purchase, rewrite_purchase, clean_purchases } =
  purchases_slice.actions

export const reducer = purchases_slice.reducer
