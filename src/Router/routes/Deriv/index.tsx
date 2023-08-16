import { state } from "+local"
import { useDispatch } from "+redux"
import { set_deriv } from "+redux/slices/access"
import { rewrite_editables } from "+redux/slices/editables"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

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

      if (!(acctKey in inputObject)) {
        break
      }

      // const newObj = {
      //   [acctKey]: inputObject[acctKey],
      //   [curKey]: inputObject[curKey],
      //   // state: inputObject.state,
      //   [tokenKey]: inputObject[tokenKey]
      // }

      const newObj = {
        acct: inputObject[acctKey],
        cur: inputObject[curKey],
        token: inputObject[tokenKey]
      }

      resultArray.push(newObj)
      counter++
    }

    // console.log(resultArray)
    // console.log(resultArray[0].token, resultArray[1].token)

    dispatch(set_deriv(resultArray))
    dispatch(
      rewrite_editables({
        api_token: resultArray[1].token,
        currency: resultArray[1].cur
      })
    )

    navigate("/trade")
  }

  return <div>Deriv</div>
}

export default Deriv
