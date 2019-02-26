import useMultiState from 'use-multi-state'

const useForm = (callback) => {
  const [
    [values, setValues],
    [hasErrors, setHasErrors]
  ] = useMultiState({}, true)

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault()
    }
    callback()
  }

  const handleChange = ({ name, value, error }) => {
    const newValues = { ...values, [name]: { value, error } }
    setValues(newValues)
    setHasErrors(Object.keys(newValues).some((key) => newValues[key].error))
  }

  return {
    handleChange,
    handleSubmit,
    values,
    hasErrors
  }
}

export default useForm
