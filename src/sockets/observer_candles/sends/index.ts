import { store } from "+redux"
import { state } from "+local"

// Funciones que iremos usando en el tiempo

// aqui vamos a poder enviar la data
// sin que tengamos que escribir todo lo mismo una y otra vez
export const send = (data: Object) => {
  if (state.logs.show_send_logs) console.log(":: socket ticks send : ", data)
  if (typeof state.WebSockets.observador === "undefined")
    return console.log("no existe el WebSocket")
  state.WebSockets.observador.send(JSON.stringify(data))
}

// esta funcion es solo para hacer ping
// la idea es que no se cierre el socket
const send_time = () => {
  send({ time: 1 })
}

// aqui vamos a repetir el envio del ping
// esto va a ser cada 30 segundos
export const send_time_repet = () => {
  setInterval(() => {
    send_time()
  }, 30 * 1000)
}

export const subscribe_ohcl_with_history = () => {
  const message = {
    ticks_history: store.getState().editables.symbol,
    adjust_start_time: 1,
    count: 15,
    end: "latest",
    start: 1,
    style: "candles",
    subscribe: 1
  }
  send(message)
}
