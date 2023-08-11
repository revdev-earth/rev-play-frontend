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

const labelStyle = "flex flex-col gap-4 relative group cursor-default"
const textStyle =
  "absolute text-sm opacity-50 z-10 group-hover:-top-5 group-hover:left-0 transition-all cursor-default"
const inputStyle =
  "border border-solid rounded px-2 py-1 transition-all duration-300 focus:outline-none focus:border-blue-500 cursor-default"

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [auth, setAuth] = useState(initial_state)
  const [tokenLogin, setTokenLogin] = useState<string>()

  const [vipCodeActive, setVipCodeActive] = useState(false)
  const [userExist, setUserExist] = useState(false)

  const [buttonLoading, setButtonLoading] = useState(false)

  const [isUserChecked, setIsUserChecked] = useState(false)
  const [isNick, setIsNick] = useState(false)

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
      setUserExist(response.ok)
      setIsUserChecked(true)
      setButtonLoading(false)
    } catch (error) {
      console.log("Error during login:", error)
    }
  }, [])

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const clickLogin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            nick: auth.nick,
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
      }
    } catch (error) {
      console.log("Error during login:", error)
    }
  }

  const clickRegister = async () => {
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
      }
    } catch (error) {
      console.log("Error during login:", error)
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
    textStyle + (length > 0 ? " -top-5 left-0" : " top-1 left-3")

  const nickOrEmail = () => {
    setButtonLoading(true)
    const isEmail = auth.nick_or_email.includes("@")
    setIsNick(!isEmail)
    setAuth((prevState) => ({
      ...prevState,
      [isEmail ? "email" : "nick"]: auth.nick_or_email
    }))
    checkUser(auth.nick_or_email)
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
      {!isUserChecked && (
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
            />
            <button className="px-2 py-0" onClick={nickOrEmail}>
              {!buttonLoading ? "✓" : "🖕🏽"}
            </button>
          </div>
        </motion.label>
      )}

      {isUserChecked && (
        <>
          {isNick && (
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

          {!isNick && (
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
              <div className={textStyleAction(auth.password.length)}>Email</div>
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
                value={auth.vipCode}
                className={inputStyle}
              />
            </motion.label>
          )}

          <button
            type="button"
            onClick={inClick}
            className="
          relative py-2 px-4 opacity-50 border-2 rounded
          bg-blue-500 text-white  
          hover:bg-blue-300 hover:text-black hover:border-yellow-700 
          hover:font-bold focus:outline-none focus:ring focus:ring-blue-300 
          transition-all
        "
          >
            {!buttonLoading ? "in" : "...🫷🏽😃🫸🏽..."}
          </button>
        </>
      )}
    </motion.div>
  )
}

export default Auth
