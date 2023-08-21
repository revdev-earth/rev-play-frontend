import { useState, useEffect } from "react"
import Chart from "./fragments/Chart"
import { state } from "+local"

export default () => {
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setInterval(() => {
      setUpdate((s) => !s)
    }, 500)
  }, [])

  return <Chart yValues={state.lists.ticks} />
}
