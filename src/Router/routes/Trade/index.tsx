import { useEffect } from "react"
import { motion } from "framer-motion"

import { Editables } from "./fragments/Editables"
import { Information } from "./fragments/Information"
import Purchases from "./fragments/Purchases"
import Grafica from "./fragments/Grafica"
import Collapsible from "./fragments/Collapsible"
import LaBotonera from "./fragments/LaBotonera"

import ws_observador from "sockets/observador"

import "./Trade.css"

export default () => {
  // const { ws } = useSelector((s) => s)

  useEffect(() => {
    ws_observador()
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
            <Collapsible label="Market">
              <Grafica />
            </Collapsible>
          </div>

          <Collapsible label="Information">
            <Editables />
            <Information />
          </Collapsible>

          <Collapsible label="Trades">
            <Purchases />
          </Collapsible>
        </div>

        <LaBotonera />
      </motion.div>
    </div>
  )
}
