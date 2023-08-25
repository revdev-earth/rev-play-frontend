import { store } from "+redux"
import { rewrite_info } from "+redux/slices/info"
import { state } from "+local"

export const set_amounts = () => {
  const { multiplicador_del_balance_a_usar } = state.internal

  const {
    editables: { balance_to_use },
    info: { total_profit }
  } = store.getState()

  const new_balance_to_use = balance_to_use + total_profit
  let new_amount = new_balance_to_use * multiplicador_del_balance_a_usar
  new_amount = Number(new_amount.toFixed(2))

  state.internal.amount = new_amount
  state.internal.initial_amount = new_amount

  store.dispatch(
    rewrite_info({
      new_amount,
      balance_in_use: new_balance_to_use
    })
  )
}
