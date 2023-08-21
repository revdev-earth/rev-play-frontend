import { useEffect } from "react"
import { motion } from "framer-motion"

import { Editables } from "./fragments/Editables"
import { Information } from "./fragments/Information"
import Purchases from "./fragments/Purchases"
import ChartData from "./fragments/ChartData"
import DropDown from "./fragments/DropDown"
import ButtonPanel from "./fragments/ButtonPanel"

import ws_observer from "sockets/observer_ticks"

import "./Trade.css"

export default () => {
  // const { ws } = useSelector((s) => s)

  useEffect(() => {
    ws_observer()
  }, [])

  // return ws.comprador_ready ? <Trade /> : null
  return <Trade />
}

const Trade = () => {
  return (
    <div className={`trade flex flex-col gap-2 my-5 items-center w-4/5`}>
      <motion.div
        className="flex items-center gap-3"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 2,
            delay: 1
          }
        }}
      >
        <div>
          <div className="flex items-center w-full">
            <DropDown label="Market">
              <ChartData />
            </DropDown>
          </div>

          <DropDown label="Information">
            <Editables />
            <Information />
          </DropDown>

          <DropDown label="Trades">
            <Purchases />
          </DropDown>
        </div>

        <ButtonPanel />
      </motion.div>
    </div>
  )
}
