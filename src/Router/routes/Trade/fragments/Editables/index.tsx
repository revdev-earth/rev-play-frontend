import { useEffect, useState } from "react"
import Select from "react-select"
import type { ActionMeta, SingleValue } from "react-select"

import { state } from "+local"

import { useDispatch, useSelector } from "+redux"
import { rewrite_editables } from "+redux/slices/editables"

import ws_buyer from "sockets/buyer"

import "./Editables.css"
import { forget_and_make_proposal } from "sockets/buyer/sends"
import { forget_all_and_subscribe } from "sockets/observer_ticks/sends"

const options_duration_unit = [
  { value: "t", label: "ticks" },
  { value: "s", label: "seconds" },
  { value: "m", label: "minutes" },
  { value: "h", label: "hours" }
]

const options_symbols = [
  { value: "RDBEAR", label: "Bear Market Index" },
  { value: "RDBULL", label: "Bull Market Index" },
  { value: "R_10", label: "Volatility 10 Index" },
  { value: "R_25", label: "Volatility 25 Index" },
  { value: "R_50", label: "Volatility 50 Index" },
  { value: "R_75", label: "Volatility 75 Index" },
  { value: "R_100", label: "Volatility 100 Index" },
  { value: "1HZ10V", label: "Volatility 10 (1s) Index" },
  { value: "1HZ25V", label: "Volatility 25 (1s) Index" },
  { value: "1HZ50V", label: "Volatility 50 (1s) Index" },
  { value: "1HZ75V", label: "Volatility 75 (1s) Index" },
  { value: "1HZ100V", label: "Volatility 100 (1s) Index" }
]

interface Option {
  value: string
  label: string
}

const classCommon = "flex flex-col gap-2"

export const Editables = () => {
  const dispatch = useDispatch()
  const _editables = useSelector((s) => s.editables)
  const deriv = useSelector((s) => s.access.deriv)
  const [editables, setEditables] = useState(_editables)
  const [optionsAcc, setOptionsAcc] = useState<
    {
      value: number
      label: string
    }[]
  >([])

  useEffect(() => {
    const optionsAcc = deriv.map((acc, i) => ({
      value: i,
      label: acc.cur
    }))
    setEditables((s) => ({ ...s, actual_account: editables.actual_account }))
    setOptionsAcc(optionsAcc)
    ws_buyer()
  }, [deriv])

  useEffect(() => {
    dispatch(rewrite_editables(editables))
    // state.editables = editables
  }, [editables])

  const change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditables((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const change_select = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => setEditables((s) => ({ ...s, [actionMeta.name || ""]: option?.value }))

  const change_account = (
    option: SingleValue<{
      value: number
      label: string
    }>
  ) => {
    setEditables((s) => ({ ...s, actual_account: option?.value || 0 }))
    state.WebSockets.comprador?.close()
  }

  const change_symbol = (
    option: SingleValue<{
      value: string
      label: string
    }>
  ) => {
    if (option?.value) setEditables((s) => ({ ...s, symbol: option.value }))

    setTimeout(() => {
      forget_and_make_proposal()
      forget_all_and_subscribe()
    }, 100)
  }

  return (
    <div className="editables">
      <div>
        <label htmlFor="balance_to_use" className={classCommon}>
          <div>Account:</div>
          {/* Select Account */}
          <Select
            classNamePrefix="_"
            name="account"
            onChange={change_account}
            options={optionsAcc}
            defaultValue={optionsAcc[editables.actual_account]}
            value={optionsAcc[editables.actual_account]}
          />
        </label>
        <label htmlFor="balance_to_use" className={classCommon}>
          <div>Balance to use:</div>
          <input
            name="balance_to_use"
            type="number"
            onChange={change_input}
            value={editables.balance_to_use}
          />
        </label>
      </div>
      <div>
        <label htmlFor="duration" className={classCommon}>
          <div>Duration</div>
          <input
            name="duration"
            type="number"
            onChange={change_input}
            value={editables.duration}
          />
        </label>

        <div className={classCommon}>
          <div>Duration unit :</div>
          <Select
            classNamePrefix="_"
            name="duration_unit"
            onChange={change_select}
            options={options_duration_unit}
            defaultValue={options_duration_unit[0]}
          />
        </div>
      </div>
      <div>
        <div className={classCommon}>
          <div>Symbol :</div>
          <Select
            classNamePrefix="_"
            name="symbol"
            onChange={change_symbol}
            options={options_symbols}
            defaultValue={options_symbols[0]}
          />
        </div>
      </div>
    </div>
  )
}
