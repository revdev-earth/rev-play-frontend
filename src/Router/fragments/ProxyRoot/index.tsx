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
    localStorage.removeItem("state")
    navigate("/", { replace: true })
  }

  const tiempoRestante = (sessionTimeout: number) => {
    const minutes = Math.floor(sessionTimeout / 60000) // 60000 ms = 1 min
    const seconds = Math.floor((sessionTimeout % 60000) / 1000)
    console.log(`Tiempo restante: ${minutes}:${seconds}`)
  }

  useEffect(() => {
    validateSession()

    const sessionTimeout = sessionExpiresIn - Date.now()
    tiempoRestante(sessionTimeout)

    if (sessionTimeout > 0) {
      const timeoutId = setTimeout(validateSession, sessionTimeout)
      return () => clearTimeout(timeoutId)
    } else {
      handleSessionExpiration()
    }
  }, [sessionToken, sessionExpiresIn, navigate])

  return !isSessionValid ? <Navigate to="/" replace={true} /> : <Outlet />
}
