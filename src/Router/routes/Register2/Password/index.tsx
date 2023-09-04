import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"

export default ({
  onNoValid,
  onSuccess,
  labelClassName,
  inputClassName
}: {
  onNoValid: (check: boolean) => void
  onSuccess?: ({
    password,
    check
  }: {
    password: string
    check: boolean
  }) => void
  labelClassName: string
  inputClassName: string
}) => {
  const [password, setPassword] = useState("")
  const [isValidLength, setIsValidLength] = useState(false)
  const [hasSymbol, setHasSymbol] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)

  const check = useMemo(
    () => isValidLength && hasSymbol && hasNumber,
    [isValidLength, hasSymbol, hasNumber]
  )

  const validateLength = (inputPassword: string) => inputPassword.length >= 8
  const validateSymbol = (inputPassword: string) =>
    /[!@#$%^&*]/.test(inputPassword)
  const validateNumber = (inputPassword: string) => /\d/.test(inputPassword)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value.trim()
    setPassword(newPassword)
    setIsValidLength(validateLength(newPassword))
    setHasSymbol(validateSymbol(newPassword))
    setHasNumber(validateNumber(newPassword))
  }

  useEffect(() => {
    if (check) {
      onSuccess && onSuccess({ password, check })
    } else {
      onNoValid(check)
    }
  }, [check])

  return (
    <div>
      <motion.label
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        htmlFor="password"
        className={labelClassName}
      >
        Password:
        <input
          type="password"
          value={password}
          onChange={handleInputChange}
          className={inputClassName}
        />
      </motion.label>
      <div className="py-2">
        <p className={isValidLength ? "text-green-600" : "text-gray-600"}>
          {isValidLength
            ? "Meets length requirement."
            : "Password must have at least 8 characters."}
        </p>
        <p className={hasSymbol ? "text-green-600" : "text-gray-600"}>
          {hasSymbol
            ? "Contains at least one symbol."
            : "Password must have at least one symbol (!@#$%^&*)."}
        </p>
        <p className={hasNumber ? "text-green-600" : "text-gray-600"}>
          {hasNumber
            ? "Contains at least one number."
            : "Password must have at least one number."}
        </p>
      </div>
    </div>
  )
}
