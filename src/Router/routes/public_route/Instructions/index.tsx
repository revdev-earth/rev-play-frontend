import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Instructions = () => {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1.75
        }
      }}
    >
      <Link to="https://eu.deriv.com/signup/">Deriv Sign up</Link>
      <div>
        <div>
          <video width="320" height="240" controls>
            <source src="/how_to_user.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video>
        </div>
        {/* Video showing how to use the app */}
        {/* Video showing how to create a token */}
        {/* Video showing how to create an user in Deriv */}
        {/* Video showing how to create an user in Deriv */}
      </div>
    </motion.div>
  )
}

export default Instructions
