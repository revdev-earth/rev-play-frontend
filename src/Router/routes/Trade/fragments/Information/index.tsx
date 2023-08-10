import { useCallback, useEffect, useState } from "react"
import { useSelector } from "+redux"

import "./Information.css"
import { balance_function } from "../utils"
import { Times } from "../Times"

export function Information() {
  const {
    balance,
    balance_in_use,
    total_profit,
    total_contracts,
    total_won_contracts,
    total_loss_contracts,
    continue_won_contracts,
    continue_loss_contracts,
    position,
    max_position,
    new_amount
  } = useSelector((s) => s.info)

  return (
    <div className="information">
      <div className="flex flex-col gap-0.5">
        <div className="grid-2">
          <div>balance :</div>
          <div>{balance_function(balance)}</div>
        </div>
        <div className="grid-2">
          <div>balance in use :</div>
          <div>{balance_function(balance_in_use)}</div>
        </div>
        <div className="grid-2">
          <div>total profit :</div>
          <div>{total_profit}</div>
        </div>

        <Times />
      </div>
      <div className="flex flex-col gap-0.5">
        <div>contracts</div>
        <div className="grid-2">
          <div>total :</div>
          <div>{total_contracts}</div>
        </div>
        <div className="grid-2">
          <div>total won :</div>
          <div>{total_won_contracts}</div>
        </div>
        <div className="grid-2">
          <div>total loss :</div>
          <div>{total_loss_contracts}</div>
        </div>
        <div className="grid-2">
          <div>continue won :</div>
          <div>{continue_won_contracts}</div>
        </div>
        <div className="grid-2">
          <div>continue loss :</div>
          <div>{continue_loss_contracts}</div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="grid-2">
          <div>max position :</div>
          <div>{max_position}</div>
        </div>
        <div className="grid-2">
          <div>actual position:</div>
          <div>{position}</div>
        </div>
        <div className="grid-2">
          <div>new amount:</div>
          <div>{new_amount}</div>
        </div>
        <CountDown />
      </div>
    </div>
  )
}

const CountDown = () => {
  const { random_seconds_wait } = useSelector((s) => s.info)

  const [seconds, setSeconds] = useState<number | string>(0)

  const startCoundDown = useCallback(() => {
    let internal_seconds = random_seconds_wait
    setSeconds(internal_seconds)
    setTimeout(() => setSeconds(internal_seconds--), 1000)
    let interval = setInterval(() => {
      if (internal_seconds <= 0) {
        clearInterval(interval)
        setTimeout(() => {
          setSeconds("-")
        }, 500)
      } else setSeconds(internal_seconds--)
    }, 1000)
  }, [random_seconds_wait])

  useEffect(() => {
    startCoundDown()
  }, [random_seconds_wait])

  return (
    <div className="grid-2">
      <div>wait seconds:</div>
      <div>{seconds}</div>
    </div>
  )
}
