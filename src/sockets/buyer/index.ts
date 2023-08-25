import { message } from "./events/message"
import { open } from "./events/open"
import { close } from "./events/close"
import { error } from "./events/error"
import { state } from "+local"

const app_id = import.meta.env.VITE_APP_ID
const url = import.meta.env.VITE_BRO

const uri = `${url}${app_id}`

export default () => {
  console.log(" :: socket buyer launched")
  const ws = new WebSocket(uri)
  ws.onopen = open
  ws.onclose = close
  ws.onerror = error
  ws.onmessage = message
  state.WebSockets.comprador = ws
}
