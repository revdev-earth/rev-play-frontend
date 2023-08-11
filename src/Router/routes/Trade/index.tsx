import { Editables } from "./fragments/Editables"
import { Information } from "./fragments/Information"
import Purchases from "./fragments/Purchases"
import Grafica from "./fragments/Grafica"

import "./Trade.css"
import Collapsible from "./fragments/Collapsible"
import LaBotonera from "./fragments/LaBotonera"
import observador from "sockets/observador"
import comprador from "sockets/comprador"

import { motion } from "framer-motion"

const Sockets = () => {
  observador()
  comprador()
  return null
}

export default () => (
  <div className={`trade flex flex-col gap-2 my-5 items-center w-4/5`}>
    <Sockets />

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
