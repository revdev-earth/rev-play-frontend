import { stop, pausa, play } from "+local"
import { useNavigate } from "react-router-dom"
import { logoutDeriv } from "sockets/buyer/sends"

export default () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("state")
    if (import.meta.env.PROD) logoutDeriv()
    navigate(0)
    navigate("/", { replace: true })
  }

  return (
    <div className="flex flex-col gap-3">
      <button onClick={play}>play</button>
      <button onClick={pausa}>pausa</button>
      <button onClick={stop}>stop</button>
      <button disabled>clean</button>
      <button onClick={logOut}>out</button>
    </div>
  )
}
