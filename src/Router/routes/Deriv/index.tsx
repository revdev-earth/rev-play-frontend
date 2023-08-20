import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "+redux"
import { set_deriv } from "+redux/slices/access"

const Deriv = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    isolate_for_number(was())
  }, [])

  const was = () => {
    // Obtén la cadena de consulta de la URL
    const queryString = window.location.search

    // Elimina el "?" del inicio de la cadena de consulta
    const queryStringWithoutQuestionMark = queryString.slice(1)

    // Divide la cadena de consulta en pares de nombre y valor
    const paramPairs = queryStringWithoutQuestionMark.split("&")

    // Crea un objeto para almacenar los parámetros
    const paramsObject = {} as Record<string, string>

    // Itera a través de los pares de parámetros y agrega al objeto
    paramPairs.forEach((paramPair) => {
      const [name, value] = paramPair.split("=")
      paramsObject[name] = value
    })

    // console.log(paramsObject)

    return paramsObject
  }

  const isolate_for_number = (inputObject: any) => {
    const resultArray = []
    let counter = 1

    while (true) {
      const acctKey = `acct${counter}`
      const curKey = `cur${counter}`
      const tokenKey = `token${counter}`

      if (!(acctKey in inputObject)) break

      const newObj = {
        acct: inputObject[acctKey],
        cur: inputObject[curKey],
        token: inputObject[tokenKey]
      }

      resultArray.push(newObj)
      counter++
    }

    dispatch(set_deriv(resultArray))

    navigate("/trade", { replace: true })
  }

  return <div>Deriv</div>
}

export default Deriv
