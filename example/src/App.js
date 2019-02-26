import React, { useState } from 'react'
import StyledInput, { useForm } from 'styled-input'

import './App.css'

const App = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const {
    values,
    hasErrors,
    handleChange,
    handleSubmit
  } = useForm(() => {
    if (canSubmit) {
      setSuccess(true)
    } else {
      setError(new Error('There is a problem, please check the fields'))
    }
  })

  const canSubmit = !hasErrors && values.name && values.message

  return (
    <div className="page">
      <header>
        <h1>Example of Styled Input</h1>
      </header>
      <div className="my-cool-form">
        {success ? (
          <div className="success-message">
            Here's what you submitted:
            <ul>
              {Object.entries(values).map(([key, { value }], i) => (
                <li key={i}>
                  <div>{key}</div>
                  <div>{value}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit} disabled={!canSubmit}>
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
            <div className="submit-wrapper">
              <button type="submit" disabled={!canSubmit}>
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default App
