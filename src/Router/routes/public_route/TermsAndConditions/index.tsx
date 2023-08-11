import { motion } from "framer-motion"

const TermsAndConditions = () => {
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
      <div>Terms And Conditions</div>
      <div>...</div>
    </motion.div>
  )
}

export default TermsAndConditions
