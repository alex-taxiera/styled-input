import React, { useState } from 'react'
import { StyledInput, useForm } from 'styled-input'

import './App.css'

const App = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const {
    fields,
    hasErrors,
    isComplete,
    handleSubmit,
    handleChange
  } = useForm([
    {
      name: 'name',
      label: 'Your Name',
      type: 'text',
      value: '',
      isRequired: true
    },
    {
      name: 'message',
      label: 'Your Message',
      type: 'textarea',
      value: '',
      isRequired: true
    }
  ], () => {
    if (canSubmit) {
      setSuccess(true)
    } else {
      setError(new Error('There is a problem, please check the fields'))
    }
  })

  const canSubmit = !hasErrors && isComplete

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
              {
                Object.entries(fields).map(([name, { value }], i) => (
                  <li key={i}>
                    <div>{name}</div>
                    <div>{value}</div>
                  </li>
                ))
              }
            </ul>
          </div>
        ) : (
          <form onSubmit={handleSubmit} disabled={!canSubmit}>
          <h2>My Cool Form</h2>
            {
              Object.values(fields).map((field, i) => (
                <StyledInput
                  key={i}
                  name={field.name}
                  id={field.name}
                  label={field.label}
                  type={field.type}
                  value={field.value}
                  isRequired={field.isRequired}
                  onChange={handleChange}
                />
              ))
            }
            <div className="error-message">{error && error.message}</div>
            <div className="submit-wrapper">
              <button type="submit" className={!canSubmit ? 'disabled' : ''}>
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      <footer>
        <div className="flex">
          <div>&copy; <a href="https://www.github.com/alex-taxiera">Alex Taxiera</a></div>
          <div><a href="https://www.github.com/alex-taxiera/styled-input">{'<Code />'}</a></div>
        </div>
      </footer>
    </div>
  )
}

export default App
