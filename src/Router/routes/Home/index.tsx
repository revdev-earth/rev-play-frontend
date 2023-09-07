import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default () => (
  <motion.div
    className="flex flex-col min-h-[100vh] w-full justify-between mx-5 h-20"
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
    <header className="flex w-full justify-between mx-5 h-20 items-center">
      <div>Rev Play</div>
    </header>

    <div className="flex gap-5 justify-center ">
      <Link to="/login">Log in</Link>
      <div>|</div>
      <Link to="/register1">Sign up</Link>
    </div>

    <footer className="flex flex-col gap-4 h-60 items-center justify-end pb-10">
      <div className="flex gap-4">
        <Link to="public/license_agreement">license agreement</Link>
        <Link to="public/property_recognition_agreement_and_user_commitment">
          property recognition agreement and user commitment
        </Link>
        <Link to="public/privacy_policy">privacy policy</Link>
        <Link to="public/instructions">Instructions</Link>
      </div>
      <div> All rights reserved - Rev Play</div>
    </footer>
  </motion.div>
)
