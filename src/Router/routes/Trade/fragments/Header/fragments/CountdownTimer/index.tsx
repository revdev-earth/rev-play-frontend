import { useEffect, useState } from "react"
import { useSelector } from "+redux"

export default () => {
  const sessionExpiresIn = useSelector((s) => s.access.sessionExpiresIn)
  const [timeLeft, setTimeLeft] = useState(sessionExpiresIn - Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1000)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60000) // 60000 ms = 1 min
  const seconds = Math.floor((timeLeft % 60000) / 1000)

  return (
    <div>
      {minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </div>
  )
}
