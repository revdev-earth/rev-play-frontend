import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
          delay: 0.5
        }
      }}
    >
      <div>
        <NavLink
          to="/auth"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          In
        </NavLink>
      </div>
      <div>Rev Trade</div>
    </motion.div>
  )
}

export default Home
