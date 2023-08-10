import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "+redux"
import { rewrite_editables } from "+redux/slices/editables"
import { motion } from "framer-motion"

const initial_state = {
  api_token: "" || import.meta.env.VITE_TEST_TOKEN
}

export default () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [editables, setEditables] = useState(initial_state)

  const change_input = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditables((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const click = () => {
    dispatch(rewrite_editables({ api_token: editables.api_token }))
    navigate("/trade")
  }

  useEffect(() => {
    click()
  }, [])

  return (
    <motion.div
      className="flex gap-24"
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2
        }
      }}
    >
      <label htmlFor="balance_to_use" className="flex flex-col gap-4">
        <div>Api token:</div>
        <input
          name="api_token"
          type="text"
          onChange={change_input}
          value={editables.api_token}
        />
      </label>

      <button type="button" onClick={click}>
        Iniciar la sesion
      </button>
    </motion.div>
  )
}
