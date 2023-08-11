import { stop, pausa, play } from "+local"
import { useNavigate } from "react-router-dom"

export default () => {
  const navigate = useNavigate()
  const logOut = () => {
    localStorage.removeItem("state")
    navigate("/")
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
