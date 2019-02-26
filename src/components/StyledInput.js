import React from 'react'
import PropTypes from 'prop-types'

import useMultiState from 'use-multi-state'

import './styles/StyledInput.scss'

const StyledInput = ({
  name,
  id,
  type,
  label,
  onChange,
  isValid,
  isRequired,
  errorMessage,
  requiredMessage,
  wrapperClassName,
  inputClassName
}) => {
  const [
    [focused, setFocused],
    [error, setError],
    [value, setValue]
  ] = useMultiState(false, null, '')

  const fieldProps = {
    name,
    id,
    type,
    value,
    className: inputClassName,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false)
      if (isRequired && (!value || !value.trim())) {
        setError(requiredMessage)
      }
    },
    onChange: (event) => {
      const value = event.target.value
      const nextError = !value || !value.trim()
        ? requiredMessage
        : isValid && !isValid(value)
          ? errorMessage
          : null

      onChange && onChange({ name, value, error: nextError })
      setValue(value)
      setError(nextError)
    }
  }

  return (
    <div className={'styled-input' + (wrapperClassName ? ` ${wrapperClassName}` : '')}>
      <div className="input">
        {type === 'textarea' ? (
          <textarea {...fieldProps} />
        ) : (
          <input {...fieldProps} />
        )}
        <span
          className={'line' + (error ? ' error' : focused ? ' focused' : '')}
        />
        <label
          htmlFor={id}
          className={(value ? 'with-value' : '') + (error ? ' error' : focused ? ' focused' : '')}
        >
          {label}
        </label>
      </div>
      <div className="error-message">
        {error}
      </div>
    </div>
  )
}

StyledInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  requiredMessage: PropTypes.string,
  wrapperClassName: PropTypes.string,
  inputClassName: PropTypes.string
}

StyledInput.defaultProps = {
  isRequired: false,
  errorMessage: 'error',
  requiredMessage: 'This is a required field'
}

export default StyledInput
