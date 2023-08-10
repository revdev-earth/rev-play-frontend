import { useSelector } from "+redux"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"

export const ProxyRoot = () => {
  const navigate = useNavigate()

  const { sessionToken, sessionExpiresIn } = useSelector((s) => s.access)

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/auth/checkAccess`,
          {
            headers: { Authorization: `Bearer ${sessionToken}` }
          }
        )

        if (!response.ok) {
          localStorage.setItem("state", JSON.stringify({}))
          navigate("/")
        }
      } catch (error) {
        console.log("Error during login:", error)
      }
    }
    checkAccess()
    const Timeout = setTimeout(() => {
      checkAccess()
    }, sessionExpiresIn - Date.now())
    return () => {
      clearTimeout(Timeout)
    }
  }, [])

  if (!sessionToken) return <Navigate to="/" replace={true} />

  return <Outlet />
}
