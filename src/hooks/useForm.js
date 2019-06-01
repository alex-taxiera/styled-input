import { useState } from 'react'

export default function useForm (state = [], submitCallback) {
  const [fields, setFields] = useState(state.reduce((store, field) => {
    store[field.name] = field
    return store
  }, {}))
  const [hasErrors, setHasErrors] = useState(true)
  const [isComplete, setIsComplete] = useState(!state.some(({ isRequired }) => isRequired))

  const handleSubmit = (event) => {
    event && event.preventDefault()
    submitCallback(fields)
  }

  const handleChange = ({ name, value, error }) => {
    const newFields = { ...fields, [name]: { ...fields[name], value, error } }
    setFields(newFields)
    const vals = Object.values(newFields)
    setHasErrors(vals.some(({ error }) => error))
    setIsComplete(!vals.some(({ value, isRequired }) => !value.trim() && isRequired))
  }

  return {
    handleChange,
    handleSubmit,
    fields,
    hasErrors,
    isComplete
  }
}
