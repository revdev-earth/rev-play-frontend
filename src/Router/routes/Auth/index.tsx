import React, { useCallback, useState } from "react"
import { useDispatch } from "+redux"
import { useNavigate } from "react-router-dom"
import { set_session_token } from "+redux/slices/access"
import { motion } from "framer-motion"
import { debounce } from "lodash"

const initial_state = {
  nick_or_email: "",
  nick: "",
  email: "",
  password: "",
  vipCode: ""
}

const labelStyle = "flex flex-col gap-4 relative mt-5 group cursor-default"
const textStyle =
  "absolute opacity-70 z-10 group-hover:-top-6 group-hover:left-0 transition-all cursor-default"
const inputStyle =
  "border border-solid rounded px-2 pt-2 pb-2 transition-all duration-300 focus:outline-none focus:border-blue-500 cursor-default"

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [auth, setAuth] = useState(initial_state)
  const [tokenLogin, setTokenLogin] = useState<string>()

  const [vipCodeActive, setVipCodeActive] = useState(false)
  const [userExist, setUserExist] = useState(false)

  const [loading, setLoading] = useState(false)

  const [isUserChecked, setIsUserChecked] = useState(false)
  const [isNick, setIsNick] = useState(false)

  const [error, setError] = useState("")

  const checkUser = useCallback(async (nick: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/checkUser`,
        {
          method: "POST",
          body: JSON.stringify({ nick }),
          headers: { "Content-Type": "application/json" }
        }
      )
      // const res = (await response.json()) as { message: string }
      console.log({ ok: response.ok })
      setUserExist(response.ok)
      setIsUserChecked(true)
      setLoading(false)
    } catch (error) {
      console.log("Error during login:", error)
      setError("An error occurred during user check, try later.")
      setLoading(false)
      cleanErrorIn5s()
    }
  }, [])

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const clickLogin = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            nick: auth.nick,
            email: auth.email,
            password: auth.password
          }),
          headers: { "Content-Type": "application/json" }
        }
      )

      const res = (await response.json()) as { token: string }

      if (response.ok) {
        setVipCodeActive(true)
        setTokenLogin(res.token)
      } else {
        console.log("Login failed", res)
        setError("Seems there was a write mistake, there are two tries left")
        cleanErrorIn5s()
      }
      setLoading(false)
    } catch (error) {
      console.log("Error during login:", error)
      setLoading(false)
    }
  }

  const clickRegister = async () => {
    setLoading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({
            nick: auth.nick,
            email: auth.email,
            password: auth.password
          }),
          headers: { "Content-Type": "application/json" }
        }
      )

      const res = (await response.json()) as { token: string }

      if (response.ok) {
        setVipCodeActive(true)
        setTokenLogin(res.token)
      } else {
        console.log("Login failed", res)
        setError("Seems there was error")
        cleanErrorIn5s()
      }
      setLoading(false)
    } catch (error) {
      console.log("Error during login:", error)
      setLoading(false)
    }
  }

  const clickCodeVip = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/vipCode`,
        {
          method: "POST",
          body: JSON.stringify({ vipCode: auth.vipCode }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenLogin}`
          }
        }
      )

      if (response.ok) {
        const { token, sessionExpiresIn } = (await response.json()) as {
          token: string
          sessionExpiresIn: number
        }

        dispatch(set_session_token({ sessionToken: token, sessionExpiresIn }))
        navigate("/access")
      } else {
        console.log("vip code failed", await response.json())
        setError("vip code failed, try again")
        cleanErrorIn5s()
      }
    } catch (error) {
      console.log("Error during login:", error)
    }
  }

  const inClick = () =>
    !vipCodeActive
      ? userExist
        ? clickLogin()
        : clickRegister()
      : clickCodeVip()

  const textStyleAction = (length: number) =>
    textStyle + (length > 0 ? " -top-6 left-0" : " top-2 left-3")

  const nickOrEmail = () => {
    setLoading(true)
    const isEmail = auth.nick_or_email.includes("@")
    setIsNick(!isEmail)
    setAuth((prevState) => ({
      ...prevState,
      [isEmail ? "email" : "nick"]: auth.nick_or_email
    }))
    checkUser(auth.nick_or_email)
  }

  const cleanErrorIn5s = () => {
    setTimeout(() => {
      setError("")
    }, 5000)
  }

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2
        }
      }}
    >
      {error && (
        <motion.p
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: "auto",
            transition: {
              duration: 0.5
            }
          }}
          className="text-red-500"
        >
          {error}
        </motion.p>
      )}

      {loading && (
        <motion.p
          initial={{
            opacity: 0,
            height: 0
          }}
          animate={{
            opacity: 1,
            height: "auto",
            transition: {
              duration: 0.5
            }
          }}
          className="text-blue-500"
        >
          request is loading, please wait 😃
        </motion.p>
      )}

      {!isUserChecked && (
        <>
          <div className="opacity-70">
            Let's ensure that your nick or email is registered.
          </div>
          <motion.label
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.5
              }
            }}
            htmlFor="nick_or_email"
            className={labelStyle}
          >
            <div className={textStyleAction(auth.nick_or_email.length)}>
              nick or email
            </div>
            <div className="flex gap-3">
              <input
                name="nick_or_email"
                type="text"
                onChange={inputChange}
                value={auth.nick_or_email}
                className={inputStyle}
                disabled={isUserChecked}
                onKeyDown={(e) => e.key === "Enter" && nickOrEmail()}
              />
              <button
                className="px-2 py-0 transition-all"
                onClick={nickOrEmail}
                disabled={auth.nick_or_email.length === 0}
              >
                {!loading ? "✓" : "🤔"}
              </button>
            </div>
          </motion.label>
        </>
      )}
      {isUserChecked && (
        <>
          <div className="flex flex-col gap-1 opacity-70 text-center">
            {userExist ? (
              <div>Let us in</div>
            ) : (
              <>
                <div>It looks like you are not registered.</div>
                <div>Let's start here.</div>
              </>
            )}
          </div>

          {((isNick && userExist) || !userExist) && (
            <motion.label
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  duration: 0.5
                }
              }}
              htmlFor="nick"
              className={labelStyle}
            >
              <div className={textStyleAction(auth.nick.length)}>nick</div>
              <input
                name="nick"
                type="text"
                onChange={inputChange}
                value={auth.nick}
                className={inputStyle}
              />
            </motion.label>
          )}

          {((!isNick && userExist) || !userExist) && (
            <motion.label
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  duration: 0.5
                }
              }}
              htmlFor="email"
              className={`${labelStyle}`}
            >
              <div className={textStyleAction(auth.email.length)}>Email</div>
              <input
                name="email"
                type="email"
                onChange={inputChange}
                value={auth.email}
                className={inputStyle}
              />
            </motion.label>
          )}

          <motion.label
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                duration: 0.5
              }
            }}
            htmlFor="password"
            className={`${labelStyle}`}
          >
            <div className={textStyleAction(auth.password.length)}>
              ••••••••
            </div>
            <input
              name="password"
              type="password"
              onChange={inputChange}
              value={auth.password}
              className={inputStyle}
              onKeyDown={(e) =>
                e.key === "Enter" && !vipCodeActive && inClick()
              }
            />
          </motion.label>

          {vipCodeActive && (
            <motion.label
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: {
                  duration: 0.5
                }
              }}
              htmlFor="vipCode"
              className={`${labelStyle}`}
            >
              <div className={textStyleAction(auth.vipCode.length)}>
                Vip Code
              </div>
              <input
                name="vipCode"
                type="password"
                onChange={inputChange}
                onKeyDown={(e) => e.key === "Enter" && inClick()}
                value={auth.vipCode}
                className={inputStyle}
              />
            </motion.label>
          )}

          <button
            type="button"
            disabled={
              (!vipCodeActive && auth.password.length === 0) ||
              (vipCodeActive && auth.vipCode.length === 0)
            }
            onClick={inClick}
            className=" 
          relative py-2 px-4 opacity-50 border-2 rounded
          bg-blue-500 text-white  
          hover:bg-blue-300 hover:text-black hover:border-yellow-700 
          hover:font-bold focus:outline-none focus:ring focus:ring-blue-300 
          disabled:hover:bg-blue-500 disabled:hover:text-white disabled:hover:font-normal disabled:hover:border-transparent
          transition-all
        "
          >
            {!loading ? "in" : "...🫷🏽😃🫸🏽..."}
          </button>
        </>
      )}
    </motion.div>
  )
}

export default Auth
