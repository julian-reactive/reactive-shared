// Libraries
import React, { useMemo, useCallback, useEffect, useState } from 'react'
import _ from 'lodash'

// Material Components
import { red } from '@mui/material/colors'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

// Shared
import { usePreviousValue, useLabel } from '../../utils'

// Icons
import Error from '@mui/icons-material/Error'

import { BuildInputProps } from './buildInput'

// Styles
import { sxTextField } from './styles'

const SharedTextField: React.FC<BuildInputProps> = ({
  renderProps: {
    field: {
      onChange: onChangeField,
      ...field
    },
    fieldState: { error }
  },
  inputProps: {
    sx = {},
    label,
    helpText,
    InputProps = {},
    icon,
    onChange,
    value,
    ...inputProps
  }
}) => {
  const previousValue = usePreviousValue(value)

  const [inputValue, setInputValue] = useState(field.value || value || '')

  const renderStartAdornment = useMemo(() => {
    if (icon == null) return undefined

    const Icon = icon

    return (
      <InputAdornment position='start'>
        <Icon color='action' />
      </InputAdornment>
    )
  }, [icon])

  const renderEndAdornment = useMemo(() => {
    if (error == null) return undefined

    return (
      <InputAdornment position='end'>
        <Error sx={{ fontSize: 16, color: red[400] }} />
      </InputAdornment>
    )
  }, [error])

  const handleChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = evt.target
    onChangeField(value)
    setInputValue(value)

    if (onChange) {
      onChange(value)
    }
  }, [onChange]) // eslint-disable-line react-hooks/exhaustive-deps

  const renderLabel = useLabel(label)

  useEffect(() => {
    if (!_.isEqual(previousValue, value)) {
      onChangeField(value)
      setInputValue(value)
    }
  }, [previousValue, value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TextField
      {...inputProps}
      {...field}
      onChange={handleChange}
      value={inputValue}
      fullWidth
      margin='normal'
      sx={{ ...sxTextField, ...sx }}
      label={renderLabel}
      error={Boolean(error)}
      helperText={_.get(error, 'message', helpText)}
      InputProps={{
        ...InputProps,
        startAdornment: renderStartAdornment,
        endAdornment: renderEndAdornment
      }}
    />
  )
}

export default React.memo(SharedTextField)
