import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Chart from "../Chart"
import { useSelector } from "+redux"

export default function () {
  const { symbol } = useSelector((s) => s.editables)
  const [history, setHistory] = useState<any[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<Event>()

  useEffect(() => {
    connectWebSocket()
  }, [])

  const connectWebSocket = () => {
    const url = "wss://ws.binaryws.com/websockets/v3?app_id=1089"
    const ws = new WebSocket(url)

    ws.onopen = () => {
      setIsConnected(true)
      sendSubscribeRequest(ws)
    }

    ws.onclose = () => {
      setIsConnected(false)
      setTimeout(() => {
        connectWebSocket()
      }, 1000)
    }

    ws.onerror = (error) => {
      setError(error)
      ws.close()
    }
  }

  const sendSubscribeRequest = (ws: WebSocket) => {
    const history = {
      ticks_history: symbol,
      // adjust_start_time: 1,
      count: 25,
      end: "latest",
      start: 1,
      style: "ticks",
      subscribe: 1
    }

    ws.send(JSON.stringify(history))

    ws.onmessage = (messageEvent) => {
      const data = JSON.parse(messageEvent.data)
      const { tick, history } = data as {
        tick?: {
          ask: number // 195.5616
          bid: number // 195.5416
          epoch: number //1682263346
          id: string // "205c0f00-6374-abc2-1880-8211a9dd99a3"
          pip_size: number // 4
          quote: number // 195.5516
          symbol: string // "R_50"
        }
        history?: {
          prices: number[]
          times: number[]
        }
      }

      if (tick) updateHistory(tick.quote)

      if (history) setHistory(history.prices)
    }
  }

  const updateHistory = (price: number) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory, price]
      if (prevHistory.length >= 25) return newHistory.slice(1)
      return newHistory
    })
  }

  if (!isConnected) return <motion.div>Connecting to WebSocket...</motion.div>

  if (error)
    return <motion.div layout>{JSON.stringify(error, null, 2)}</motion.div>

  return <Chart yValues={history} />
}
