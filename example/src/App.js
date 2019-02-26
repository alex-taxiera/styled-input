import React, { useState } from 'react'
import StyledInput, { useForm } from 'styled-input'

const App = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const {
    values,
    hasErrors,
    handleChange,
    handleSubmit
  } = useForm(() => {
    if (!hasErrors) {
      setSuccess(true)
    } else {
      setError(new Error('There is a problem, please check the fields'))
    }
  })

  return (
    <div className="my-cool-form">
      {success ? (
        <div className="success-message">
          Here's what you submitted:
          <ul>
            {Object.entries(values).map(([key, value], i) => (
              <li key={i}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit} disabled={hasErrors}>
          <StyledInput
            name="name"
            id="name"
            label="Your Name"
            type="text"
            isRequired
            onChange={handleChange}
          />
          <StyledInput
            name="message"
            id="message"
            label="Your Message"
            type="textarea"
            isRequired
            onChange={handleChange}
          />
          <div className="error-message">{error}</div>
          <button type="submit" disabled={hasErrors}>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default App
