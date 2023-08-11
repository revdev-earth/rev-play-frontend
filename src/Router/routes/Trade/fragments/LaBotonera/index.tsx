import { stop, pausa, play } from "+local"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

export default () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("state")
    navigate("/")
  }

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
          delay: 1
        }
      }}
    >
      <button onClick={play}>play</button>
      <button onClick={pausa}>pausa</button>
      <button onClick={stop}>stop</button>
      <button disabled>clean</button>
      <button onClick={logOut}>out</button>
    </motion.div>
  )
}
