import { useEffect, useState } from "react"
import Select from "react-select"
import type { ActionMeta } from "react-select"

import { useDispatch, useSelector } from "+redux"

import "./Editables.css"
import { rewrite_editables } from "+redux/slices/editables"

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

const options_currency = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" }
]

interface Option {
  value: string
  label: string
}

const classCommon = "flex flex-col gap-2"

export const Editables = () => {
  const dispatch = useDispatch()
  const _editables = useSelector((s) => s.editables)
  const [editables, setEditables] = useState(_editables)

  const change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditables((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const change_select = (
    option: Option | null,
    actionMeta: ActionMeta<Option>
  ) => {
    const name = actionMeta.name || ""
    setEditables((s) => ({ ...s, [name]: option?.value }))
  }

  useEffect(() => {
    dispatch(rewrite_editables(editables))
    // state.editables = editables
  }, [editables])

  return (
    <div className="editables">
      <div>
        <label htmlFor="balance_to_use" className={classCommon}>
          <div>Api token:</div>
          <input
            name="api_token"
            type="text"
            onChange={change_input}
            value={editables.api_token}
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
        <div className={classCommon}>
          <div>Currency :</div>
          <Select
            classNamePrefix="_"
            name="currency"
            onChange={change_select}
            options={options_currency}
            defaultValue={options_currency[0]}
          />
        </div>
      </div>
    </div>
  )
}
