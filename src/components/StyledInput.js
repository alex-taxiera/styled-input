import React from 'react'
import PropTypes from 'prop-types'

import useMultiState from 'use-multi-state'

import style from './styles/StyledInput.scss'

const classname = (...args) => args.filter((arg) => arg).join(' ')

const StyledInput = (props) => {
  const {
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
    accentColor,
    errorColor,
    wrapperStyle,
    inputWrapperStyle,
    inputStyle,
    textAreaStyle,
    lineStyle,
    lineFocusedStyle,
    labelStyle,
    errorMessageStyle
  } = props

  const [
    [focused, setFocused],
    [error, setError]
  ] = useMultiState(false, null)

  const fieldProps = {
    name,
    id,
    type,
    value,
    style: {
      ...inputStyle,
      ...(type === 'textarea' ? textAreaStyle : {})
    },
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
    <div
      className={style.wrapper}
      style={wrapperStyle}
    >
      <div
        className={style.inputWrapper}
        style={inputWrapperStyle}
      >
        {type === 'textarea' ? (
          <textarea {...fieldProps} />
        ) : (
          <input {...fieldProps} />
        )}
        <span
          className={classname(style.line, (focused ? style.lineFocused : null))}
          style={{
            ...lineStyle,
            ...(focused ? lineFocusedStyle : {}),
            background: (error ? errorColor : accentColor)
          }}
        />
        <label
          htmlFor={id}
          className={classname(style.label, (value ? style.withValue : null))}
          style={{
            ...labelStyle,
            ...(error ? { color: errorColor } : focused ? { color: accentColor } : {})
          }}
        >
          {label}
        </label>
      </div>
      <div
        className={style.errorMessage}
        style={{
          ...errorMessageStyle,
          color: errorColor
        }}
      >
        {error && error.message}
      </div>
    </div>
  )
}

StyledInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isValid: PropTypes.func,
  isRequired: PropTypes.bool,
  errorMessage: PropTypes.string,
  requiredMessage: PropTypes.string,
  accentColor: PropTypes.string,
  errorColor: PropTypes.string,
  wrapperStyle: PropTypes.object,
  inputWrapperStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  textAreaStyle: PropTypes.object,
  lineStyle: PropTypes.object,
  lineFocusedStyle: PropTypes.object,
  labelStyle: PropTypes.object,
  errorMessageStyle: PropTypes.object
}

StyledInput.defaultProps = {
  errorMessage: 'error',
  requiredMessage: 'This is a required field',
  accentColor: 'darkslateblue',
  errorColor: 'red'
}

export default StyledInput
