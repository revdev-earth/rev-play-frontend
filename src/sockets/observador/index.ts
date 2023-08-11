import { message } from "./events/message"
import { open } from "./events/open"
import { close } from "./events/close"
import { error } from "./events/error"
import { state } from "+local"

// # Variables para la autenticación
const app_id = "35134"

// # URI para conectarse al servidor de websockets
const uri = `wss://ws.binaryws.com/websockets/v3?app_id=${app_id}`

const connect = () => {
  console.log(" :: socket observador iniciando")
  const ws = new WebSocket(uri)

  ws.onopen = open
  ws.onclose = close
  ws.onerror = error
  ws.onmessage = message

  state.WebSockets.observador = ws
}

export default () => {
  connect()
}
