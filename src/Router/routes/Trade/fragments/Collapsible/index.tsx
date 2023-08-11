import { motion } from "framer-motion"
import { ReactNode, useState } from "react"

interface CollapsibleProps {
  label: string
  children: ReactNode
  isOpen?: boolean
}

export default ({
  label,
  children,
  isOpen: isOpenIncoming = false
}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(isOpenIncoming)

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  return (
    <div className="w-full">
      <motion.label
        className="block cursor-pointer text-xl font-bold"
        layout
        onClick={toggleIsOpen}
      >
        {label}
      </motion.label>
      <motion.div
        initial={{
          height: 0,
          opacity: 0,
          overflow: "hidden"
        }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          overflow: isOpen ? "inherit" : "hidden"
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
