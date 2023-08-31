import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Password from "../Register2/Password"
import { useDispatch } from "react-redux"
import { set_session_token } from "+redux/slices/access"

const labelStyle = "flex flex-col gap-4 relative group cursor-default"
const inputStyle =
  "border border-solid rounded px-2 pt-2 pb-2 transition-all duration-300 focus:outline-none focus:border-blue-500 cursor-default"

interface Response {
  alreadyRegistered?: boolean
  successRegstration?: boolean
}

interface Error {
  message: string
  error: string
  statusCode: number
}

export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nick_or_email: "",
    password: ""
  })

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const [error, setError] = useState("")

  const [res, setRes] = useState<Response>({})

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value.trim() }))
  }

  const registUser = useCallback(async () => {
    setSending(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            nick: !formData.nick_or_email.includes("@")
              ? formData.nick_or_email
              : "",
            email: formData.nick_or_email.includes("@")
              ? formData.nick_or_email
              : "",
            password: formData.password
          }),
          headers: { "Content-Type": "application/json" }
        }
      )

      const _res = await response.json()

      setSending(false)
      setSent(true)

      if (response.ok) {
        tokenProcess(_res)
      }

      if (!response.ok) {
        setError("your email is not jet allowed to use the app.")
        setTimeout(() => {
          navigate("/", { replace: true })
        }, 5000)
      }
    } catch (error) {
      console.log({ error })
    }
  }, [formData])

  const tokenProcess = async ({
    token,
    sessionExpiresIn
  }: {
    token: string
    sessionExpiresIn: number
  }) => {
    dispatch(set_session_token({ sessionToken: token, sessionExpiresIn }))

    if (import.meta.env.DEV) {
      navigate(`${import.meta.env.VITE_DERIV}`, { replace: true })
    } else {
      setTimeout(() => {
        window.location.replace(
          `https://oauth.binary.com/oauth2/authorize?app_id=${
            import.meta.env.VITE_APP_ID
          }`
        )
      }, 1000)
    }
  }

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

      {/* {sent && !res?.go_to_login && (
        <div>
          ✅ Registration Successful! An email containing further information
          will be sent to you shortly.
        </div>
      )}

      {sent && res?.go_to_login && (
        <div>
          ✅ Registration Successful! You can now log in to your account.
        </div>
      )} */}

      {sent && "You will be redirected to the homepage."}

      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        htmlFor="nick_or_email"
        className={labelStyle}
      >
        <div className="pl-1">Nick or email</div>
        <input
          name="nick_or_email"
          id="nick_or_email"
          autoComplete="off"
          type="nick_or_email"
          onChange={inputChange}
          value={formData.nick_or_email}
          className={inputStyle}
        />
      </motion.label>

      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        htmlFor="nick"
        className={labelStyle}
      >
        <div className="pl-1">Password</div>
        <input
          name="password"
          id="password"
          autoComplete="off"
          type="password"
          onChange={inputChange}
          value={formData.password}
          className={inputStyle}
        />
      </motion.label>

      <button
        type="button"
        disabled={
          formData.nick_or_email.length < 3 ||
          formData.nick_or_email.length < 8 ||
          sending
        }
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
