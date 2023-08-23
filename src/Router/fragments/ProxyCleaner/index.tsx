import { useEffect } from "react"
import { Outlet } from "react-router-dom"

export default () => {
  useEffect(() => {
    localStorage.removeItem("state")
  }, [])

  return <Outlet />
}
