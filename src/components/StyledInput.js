import React from 'react'
import PropTypes from 'prop-types'

import useMultiState from 'use-multi-state'

import style from './styles/StyledInput.scss'

const classname = (...args) => args.filter((arg) => arg).join(' ')

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
  wrapperStyle,
  inputStyle,
  color,
  errorColor,
  accentColor
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
    style: inputStyle,
    onFocus: () => setFocused(true),
    onBlur: () => {
      setFocused(false)
      if (isRequired && (!value || !value.trim())) {
        setError(requiredMessage)
        onChange && onChange({ name, value, error: requiredMessage })
      }
    },
    onChange: (event) => {
      const value = event.target.value
      const error = isRequired && (!value || !value.trim())
        ? requiredMessage
        : isValid && !isValid(value)
          ? errorMessage
          : null

      onChange && onChange({ name, value, error })
      setValue(value)
      setError(error)
    }
  }

  return (
    <div className={style['styled-input']} style={wrapperStyle}>
      <div className={style.input}>
        {type === 'textarea' ? (
          <textarea {...fieldProps} />
        ) : (
          <input {...fieldProps} />
        )}
        <span
          className={classname(style.line, (error ? style.error : null), (focused ? style.focused : null))}
          style={{ background: error ? errorColor : accentColor }}
        />
        <label
          htmlFor={id}
          className={classname((value ? style['with-value'] : null), (error ? style.error : focused ? style.focused : null))}
          style={{ color: error ? errorColor : focused ? accentColor : color }}
        >
          {label}
        </label>
      </div>
      <div className={style['error-message']} style={{ color: errorColor }}>
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
