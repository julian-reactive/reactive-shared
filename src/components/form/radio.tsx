import React, { useCallback, useMemo, useEffect, useState } from 'react'
import _ from 'lodash'

// Material Components
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'

// Shared
import { BuildInputProps } from './buildInput'
import { onlyText, usePreviousValue, useLabel } from '../../utils'

const SharedRadio: React.FC<BuildInputProps> = ({
  renderProps: {
    field: {
      onChange: onChangeField,
      ...field
    },
    fieldState: { error }
  },
  inputProps: {
    label,
    helpText,
    items,
    onChange,
    value
  }
}) => {
  const previousValue = usePreviousValue(value)

  const [inputValue, setInputValue] = useState(field.value || value || '')

  const handleChangeInputValue = useCallback((evt) => {
    const { value } = evt.target
    onChangeField(value)
    setInputValue(value)

    if (onChange) {
      onChange(value)
    }
  }, [onChange]) // eslint-disable-line react-hooks/exhaustive-deps

  const renderOptions = useMemo(() => {
    if (items == null) return null

    return items.map(({ value, label }) => {
      const renderLabel = typeof label === 'function' ? label() : label
      return (
        <FormControlLabel key={renderLabel} value={value} control={<Radio />} label={onlyText(renderLabel)} />
      )
    })
  }, [items])

  const renderHelpText = useMemo(() => {
    if (error != null) {
      return (
        <FormHelperText>
          {error.message}
        </FormHelperText>
      )
    }
    if (helpText) {
      return (
        <FormHelperText>
          {helpText}
        </FormHelperText>
      )
    }
  }, [error, helpText])

  const renderLabel = useLabel(label)

  useEffect(() => {
    if (!_.isEqual(previousValue, value)) {
      onChangeField(value)
      setInputValue(value)
    }
  }, [previousValue, value])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormControl component='fieldset' error={Boolean(error)}>
      <FormLabel component='legend'>{renderLabel}</FormLabel>
      <RadioGroup
        {...field}
        value={inputValue}
        onChange={handleChangeInputValue}
      >
        {renderOptions}
      </RadioGroup>
      {renderHelpText}
    </FormControl>
  )
}

export default React.memo(SharedRadio)
