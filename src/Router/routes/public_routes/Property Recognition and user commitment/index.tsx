import { motion } from "framer-motion"

export default () => {
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
      className="w-full h-full"
    >
      <object
        data="/pdfs/Property Recognition and user commitment.pdf"
        type="application/pdf"
        width="100%"
        height="500px"
        className="w-full h-full"
      >
        <p>
          Unable to display PDF file.{" "}
          <a href="/uploads/media/default/0001/01/540cb75550adf33f281f29132dddd14fded85bfc.pdf">
            Download
          </a>{" "}
          instead.
        </p>
      </object>
    </motion.div>
  )
}
