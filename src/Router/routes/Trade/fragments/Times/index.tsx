import { useEffect, useMemo, useState } from "react"

const get_the_time = () => {
  const date_now = new Date()

  const hours = date_now.getHours()
  const minutes = date_now.getMinutes()
  const seconds = date_now.getSeconds()

  return {
    time_to_show: `${hours}:${minutes}:${seconds}`,
    date: date_now
  }
}

interface GetTheTime {
  time_to_show: string
  date: Date
}

const getTimmer = (timpo_inicial: number, now: number) => {
  const times_difference = Number(
    (Math.abs(timpo_inicial - now) / 1000).toFixed(0)
  )

  const segundos = times_difference % 60
  const minutos = Math.floor(times_difference / 60)
  const horas = Math.floor(minutos / 60)

  const time = (t: number) => (t < 10 ? `0${t}` : t)

  const horas_show = horas !== 0 ? time(horas) + ":" : ""

  return `${horas_show}${time(minutos)}:${time(segundos)}`
}

export const Times = () => {
  const [now, setNow] = useState<GetTheTime>(get_the_time())

  const timpo_inicial = useMemo(() => get_the_time(), [])

  useEffect(() => {
    let interval = setInterval(() => {
      setNow(get_the_time())
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <div className="grid-2">
        <div>start time :</div>
        <div>{timpo_inicial.time_to_show}</div>
      </div>
      <div className="grid-2">
        <div>progress time :</div>
        <div>{now.time_to_show}</div>
      </div>
      <div className="grid-2 gap-1">
        <div>tiempo transcurrido :</div>
        <div>{getTimmer(timpo_inicial.date.getTime(), now.date.getTime())}</div>
      </div>
    </>
  )
}
