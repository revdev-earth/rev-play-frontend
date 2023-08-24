import { stop, pausa, play } from "+local"

export default () => (
  <div className="flex flex-col gap-3">
    <button onClick={play}>play</button>
    <button onClick={pausa}>pausa</button>
    <button onClick={stop}>stop</button>
    <button disabled>clean</button>
  </div>
)
