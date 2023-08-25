import { stop, pausa, play } from "+local"
import { useDispatch } from "+redux"
import { clean_info } from "+redux/slices/info"
import { clean_purchases } from "+redux/slices/purchases"

export default () => {
  const dispatch = useDispatch()

  const clean = () => {
    dispatch(clean_purchases())
    dispatch(clean_info())
  }

  return (
    <div className="flex flex-col gap-3">
      <button onClick={play}>play</button>
      <button onClick={pausa}>pausa</button>
      <button onClick={stop}>stop</button>
      <button onClick={clean}>clean</button>
    </div>
  )
}
