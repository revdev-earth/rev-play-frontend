import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useDispatch } from "+redux"
import { set_deriv } from "+redux/slices/access"

export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    isolateForNumber(parseQueryParams())
  }, [])

  const parseQueryParams = () => {
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

  const isolateForNumber = (inputObject: Record<string, string>) => {
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
