import { message } from "./events/message"
import { open } from "./events/open"
import { close } from "./events/close"
import { error } from "./events/error"
import { state } from "+local"

const app_id = "35134"
const uri = `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`

export default () => {
  console.log(" :: socket observer ticks launched")
  const ws = new WebSocket(uri)

  ws.onopen = open
  ws.onclose = close
  ws.onerror = error
  ws.onmessage = message

  state.WebSockets.observador = ws
}
