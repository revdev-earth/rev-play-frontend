import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import { logoutDeriv } from "sockets/buyer/sends"
import CountdownTimer from "./fragments/CountdownTimer"

export default () => {
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem("state")
    if (import.meta.env.PROD) logoutDeriv()
    navigate(0)
    navigate("/", { replace: true })
  }

  return (
    <motion.header
      className="flex w-full justify-between items-center gap-3 font-bold"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
          delay: 1
        }
      }}
    >
      <div className="text-xl">Rev Play</div>
      <CountdownTimer />
      <button onClick={logOut}>log out</button>
    </motion.header>
  )
}
