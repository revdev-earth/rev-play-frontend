import { state, stop } from "+local"
import { useSelector } from "+redux"
import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"

export default () => {
  const navigate = useNavigate()
  const [isSessionValid, setIsSessionValid] = useState(true)

  const { sessionToken, sessionExpiresIn } = useSelector((s) => s.access)

  const validateSession = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/checkAccess`,
        { headers: { Authorization: `Bearer ${sessionToken}` } }
      )
      if (!response.ok) setIsSessionValid(false)
    } catch (error) {
      console.log("Error during session validation:", error)
    }
  }

  const handleSessionExpiration = () => {
    setIsSessionValid(false)
    // remove redux state
    localStorage.removeItem("state")
    // stop the websockets
    state.reconnect = false
    state.WebSockets.comprador?.close()
    state.WebSockets.observer?.close()
    // stop the buys
    stop()
    // redirect to home
    navigate("/", { replace: true })
  }

  useEffect(() => {
    validateSession()
    const sessionTimeout = sessionExpiresIn - Date.now()
    if (sessionTimeout > 0) {
      const timeoutId = setTimeout(validateSession, sessionTimeout)
      state.reconnect = true
      return () => clearTimeout(timeoutId)
    } else {
      handleSessionExpiration()
    }
  }, [sessionToken, sessionExpiresIn, navigate])

  return !isSessionValid ? <Navigate to="/" replace={true} /> : <Outlet />
}
