import React from 'react'
import PropTypes from 'prop-types'

import useMultiState from 'use-multi-state'

import './styles/StyledInput.scss'

const classname = (...args) => args.filter((arg) => arg).join(' ')

const StyledInput = ({
  name,
  id,
  type,
  value,
  label,
  onChange,
  isValid,
  isRequired,
  errorMessage,
  requiredMessage,
  wrapperStyle,
  inputStyle,
  color,
  errorColor,
  accentColor
}) => {
  const [
    [focused, setFocused],
    [error, setError]
  ] = useMultiState(false, null)

  const fieldProps = {
    name,
    id,
    type,
    value,
    style: inputStyle,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false)
      if (isRequired && (!value || !value.trim())) {
        const error = new Error(requiredMessage)
        setError(error)
        onChange && onChange({ name, value, error })
      }
    },
    onChange: (event) => {
      const value = event.target.value
      let error = isRequired && (!value || !value.trim())
        ? requiredMessage
        : isValid && !isValid(value)
          ? errorMessage
          : null
      error = error ? new Error(error) : error

      onChange && onChange({ name, value, error })
      setError(error)
    }
  }

  return (
    <div className="styled-input-wrapper">
      <div className="styled-input">
        {type === 'textarea' ? (
          <textarea {...fieldProps} />
        ) : (
          <input {...fieldProps} />
        )}
        <span
          className={classname('styled-input-line', (error ? 'styled-input-error' : null), (focused ? 'styled-input-focused' : null))}
        />
        <label
          htmlFor={id}
          className={classname('styled-input-label', (value ? 'styled-input-with-value' : null), (error ? 'styled-input-error' : focused ? 'styled-input-focused' : null))}
        >
          {label}
        </label>
      </div>
      <div className="styled-input-error styled-input-error-message">
        {error && error.message}
      </div>
    </div>
  )
}

StyledInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  requiredMessage: PropTypes.string,
  wrapperStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  color: PropTypes.string,
  errorColor: PropTypes.string,
  accentColor: PropTypes.string
}

StyledInput.defaultProps = {
  isRequired: false,
  errorMessage: 'error',
  requiredMessage: 'This is a required field'
}

export default StyledInput
