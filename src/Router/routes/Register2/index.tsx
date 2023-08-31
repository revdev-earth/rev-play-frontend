import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { parseQueryParams } from "utils"
import Password from "./Password"

const labelStyle = "flex flex-col gap-4 relative group cursor-default"
const inputStyle =
  "border border-solid rounded px-2 pt-2 pb-2 transition-all duration-300 focus:outline-none focus:border-blue-500 cursor-default"

interface Response {
  go_to_login: boolean
}

interface Error {
  message: string[]
  error: string
  statusCode: number
}

export default () => {
  const navigate = useNavigate()

  const [dataForm, setDataForm] = useState({ nick: "", password: "" })

  const [token] = useState(parseQueryParams().token)

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const [passwordCheck, setPasswordCheck] = useState(false)

  const [error, setError] = useState("")

  const [res, setRes] = useState<Response>()

  useEffect(() => {
    if (window.location.search.length === 0) {
      window.close()
      navigate("/", { replace: true })
    }
  }, [token])

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm((s) => ({ ...s, [e.target.name]: e.target.value.trim() }))
  }

  const registUser = useCallback(async () => {
    setSending(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/register2`,
        {
          method: "POST",
          body: JSON.stringify(dataForm),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      )

      const _res = await response.json()

      setSending(false)
      setSent(true)

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
  }, [dataForm, token])

  return (
    <motion.div
      className="flex flex-col gap-5 -mt-10 w-1/3"
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

      {error.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          className="text-red-600"
        >
          {error}
        </motion.p>
      )}

      {sent && !res?.go_to_login && (
        <div>
          ✅ Registration Successful! An email containing further information
          will be sent to you shortly.
        </div>
      )}

      {sent && res?.go_to_login && (
        <div>
          ✅ Registration Successful! You can now log in to your account.
        </div>
      )}

      {sent && "You will be redirected to the homepage."}

      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        htmlFor="nick"
        className={labelStyle}
      >
        <div className="pl-1">Nick</div>
        <input
          name="nick"
          id="nick"
          autoComplete="off"
          type="nick"
          onChange={inputChange}
          value={dataForm.nick}
          className={inputStyle}
        />
      </motion.label>

      <Password
        labelClassName={labelStyle}
        inputClassName={inputStyle}
        onSuccess={({ password, check }) => {
          setDataForm((s) => ({ ...s, password }))
          setPasswordCheck(check)
        }}
        onNoValid={(check) => {
          setPasswordCheck(check)
        }}
      />

      <button
        type="button"
        disabled={dataForm.nick.length < 3 || !passwordCheck || sent || sending}
        onClick={registUser}
        className=" 
          relative py-2 px-4 border-2 rounded
          bg-blue-500 text-white font-bold

         hover:bg-blue-800
          focus:outline-none focus:ring focus:ring-blue-900 

          
          disabled:hover:bg-blue-500 disabled:hover:border-transparent
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
