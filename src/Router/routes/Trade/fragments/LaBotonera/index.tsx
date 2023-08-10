import { stop, pausa, play } from "+local"
import { motion } from "framer-motion"

export default () => {
  return (
    <motion.div
      className="flex flex-col gap-3"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
          delay: 2
        }
      }}
    >
      <button onClick={play}>play</button>
      <button onClick={pausa}>pausa</button>
      <button onClick={stop}>stop</button>
      <button disabled>clean</button>
    </motion.div>
  )
}
