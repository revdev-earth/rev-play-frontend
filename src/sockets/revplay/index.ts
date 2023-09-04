import { state } from "+local"
import { store } from "+redux"
import io from "socket.io-client"

export default () => {
  console.log(" :: socket io revplay launched")

  const socket = io(import.meta.env.VITE_WS_URL)

  socket.on("exception", (data) => {
    console.log("exception", data)
  })

  socket.on("close", (e) => {
    console.log("close", e)
  })

  socket.on("disconnect", () => {
    console.log("Disconnected")
  })

  socket.on("updateCredit", (e) => {
    console.log("updateCredit", e)
  })

  socket.on("auth", (data) => {
    // console.log("auth2", data)
    socket.emit("getCredit")
  })

  socket.on("getCredit", (data) => {
    state.info.credit_left = data.credit_left
  })

  socket.on("connect", function () {
    console.log("Connected")

    socket.emit("auth", { token: store.getState().access.sessionToken })

    // socket.emit("events", { test: "test" }, (data: any) => {
    //   console.log("event", data)
    // })

    // socket.emit("identity", 0, (response: any) =>
    //   console.log("identity:", response)
    // )

    // socket.emit(
    //   "status",
    //   {
    //     dinero_invertido: 2000,
    //     dinero_ganado: 500,
    //     dinero_perdido: 100
    //   },
    //   (data: any) => {
    //     console.log("status", data)
    //   }
    // )
  })

  state.WebSockets.rev_play = socket
}
