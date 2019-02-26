import useMultiState from 'use-multi-state'

const useForm = (state = {}, callback) => {
  const [
    [values, setValues],
    [hasErrors, setHasErrors],
    [isComplete, setIsComplete]
  ] = useMultiState(state, true, !Object.values(state).some(({ isRequired }) => isRequired))

  const handleSubmit = (event) => {
    event && event.preventDefault()
    callback()
  }

  const handleChange = ({ name, value, error }) => {
    const newValues = { ...values, [name]: { value, error } }
    setValues(newValues)
    const vals = Object.values(newValues)
    setHasErrors(vals.some(({ error }) => error))
    setIsComplete(!vals.some(({ value, isRequired }) => !value.trim() && isRequired))
  }

  return {
    handleChange,
    handleSubmit,
    values,
    hasErrors,
    isComplete
  }
}

export default useForm
