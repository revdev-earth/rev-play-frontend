import { useEffect, useState } from "react"
import Select from "react-select"
import type { ActionMeta, SingleValue } from "react-select"

import { state } from "+local"

import { useDispatch, useSelector } from "+redux"
import { rewrite_editables } from "+redux/slices/editables"

import ws_buyer from "sockets/buyer"

import "./Editables.css"

const options_duration_unit = [
  { value: "t", label: "ticks" },
  { value: "s", label: "seconds" },
  { value: "m", label: "minutes" },
  { value: "h", label: "hours" }
]

const options_symbols = [
  { value: "R_100", label: "R_100" },
  { value: "R_75", label: "R_75" },
  { value: "R_50", label: "R_50" },
  { value: "R_10", label: "R_10" },
  { value: "1HZ100V", label: "1HZ100V" },
  { value: "1HZ75V", label: "1HZ75V" },
  { value: "1HZ50V", label: "1HZ50V" },
  { value: "1HZ25V", label: "1HZ25V" },
  { value: "1HZ10V", label: "1HZ10V" }
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

  const change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditables((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const change_select = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => setEditables((s) => ({ ...s, [actionMeta.name || ""]: option?.value }))

  const change_account = (
    newValue: SingleValue<{
      value: number
      label: string
    }>
  ) => {
    setEditables((s) => ({ ...s, actual_account: newValue?.value || 0 }))
    state.WebSockets.comprador?.close()
  }

  useEffect(() => {
    dispatch(rewrite_editables(editables))
    // state.editables = editables
  }, [editables])

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
            onChange={change_select}
            options={options_symbols}
            defaultValue={options_symbols[0]}
          />
        </div>
      </div>
    </div>
  )
}
