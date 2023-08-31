export const convertidor_de_hora = (_epoch: number) => {
  const epoch = new Date(Number(_epoch + "000"))
  return la_hora(epoch)
}

export const la_hora = (time = new Date()) => {
  const timeString = time.toLocaleString()
  const regex = /(\d{1,2}:\d{2}:\d{2})/ // expresión regular para encontrar la hora en el formato HH:MM:SS
  const match = timeString.match(regex) || "" // encuentra la hora en la cadena de texto usando la expresión regular
  const hora = match[0] // obtiene la hora como una cadena de texto en el formato HH:MM:SS

  // console.log({ hora }) // muestra la hora en formato HH:MM:SS (por ejemplo: 15:16:38)

  return hora
}

export const numFix = (num: number) => Number(num.toFixed(2))

export const parseQueryParams = () => {
  const queryString = window.location.search
  const queryStringWithoutQuestionMark = queryString.slice(1)
  const paramPairs = queryStringWithoutQuestionMark.split("&")
  const paramsObject = {} as Record<string, string>

  paramPairs.forEach((paramPair) => {
    const [name, value] = paramPair.split("=")
    paramsObject[name] = value
  })

  return paramsObject
}
