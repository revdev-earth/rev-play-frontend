import io from "socket.io-client"

export default () => {
  console.log(" :: socket io revplay launched")

  const socket = io("http://localhost:3000")

  socket.on("connect", function () {
    console.log("Connected")

    socket.emit("events", { test: "test" })

    socket.emit("identity", 0, (response: any) =>
      console.log("Identity:", response)
    )

    socket.emit("status", {
      dinero_invertido: 2000,
      dinero_ganado: 500,
      dinero_perdido: 100
    })
  })

  socket.on("events", (data) => {
    console.log("event", data)
  })

  socket.on("status", (data) => {
    console.log("status", data)
  })

  socket.on("exception", (data) => {
    console.log("event", data)
  })

  socket.on("disconnect", () => {
    console.log("Disconnected")
  })
}
