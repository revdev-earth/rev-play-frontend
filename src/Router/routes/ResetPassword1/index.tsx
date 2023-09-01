import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const labelStyle = "flex flex-col gap-4 relative group cursor-default"
const inputStyle =
  "border border-solid rounded px-2 pt-2 pb-2 transition-all duration-300 focus:outline-none focus:border-blue-500 cursor-default"

interface Response {
  success: boolean
}

interface Error {
  message: string[]
  error: string
  statusCode: number
}

export default () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const [error, setError] = useState("")

  const [res, setRes] = useState<Response>()

  const registUser = useCallback(async () => {
    setSending(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/reset-password-1`,
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "Content-Type": "application/json" }
        }
      )

      const _res = await response.json()

      setSending(false)
      setSent(true)

      console.log(_res)

      if (response.ok) {
        setRes(_res as Response)
      }

      if (!response.ok) {
        setError((_res as Error).message[0])
      }

      setTimeout(() => {
        navigate("/", { replace: true })
      }, 5000)
    } catch (error) {
      console.log({ error })
    }
  }, [email])

  return (
    <motion.div
      className="flex flex-col gap-5 -mt-10"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 2 }
      }}
    >
      {sending && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="text-blue-500"
        >
          request is loading, please wait 😃
        </motion.p>
      )}

      {sent && res?.success && (
        <div>✅ Email sent, please check your mail.</div>
      )}

      {sent && "You will be redirected to the homepage."}

      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        htmlFor="email"
        className={labelStyle}
      >
        <div className="pl-1">Email</div>
        <input
          name="email"
          id="email"
          autoComplete="off"
          type="email"
          onChange={(e) => setEmail(e.target.value.trim())}
          value={email}
          className={inputStyle}
        />

        {error.length > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            className="text-red-600"
          >
            {error}
          </motion.p>
        )}
      </motion.label>

      <button
        type="button"
        disabled={
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          sent ||
          sending
        }
        onClick={registUser}
        className=" 
          relative py-2 px-4 border-2 rounded
          bg-blue-500 text-white  

          hover:bg-blue-300 hover:text-black hover:border-yellow-700 
          hover:font-bold focus:outline-none focus:ring focus:ring-blue-300 
          
          disabled:hover:bg-blue-500 disabled:hover:text-white 
          disabled:hover:font-normal disabled:hover:border-transparent
          disabled:opacity-50 disabled:hover:opacity-50
          
          transition-all
        "
      >
        {!(sending || sent) && "send"}
        {sending && "sending"}
        {sent && "sent"}
      </button>
    </motion.div>
  )
}
