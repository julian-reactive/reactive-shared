import React, { useCallback, useMemo, useEffect, useState } from 'react'
import _ from 'lodash'

// Material Components
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

// Shared
import { BuildInputProps } from './buildInput'
import { onlyText, usePreviousValue, useLabel } from '../../utils'

const SharedSelect: React.FC<BuildInputProps> = ({
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
    required,
    items,
    onChange,
    disabled,
    value
  }
}) => {
  const previousValue = usePreviousValue(value)

  const [inputValue, setInputValue] = useState(field.value || value || '')

  const handleOnChange = useCallback((evt: SelectChangeEvent) => {
    const { value } = evt.target

    onChangeField(value)
    setInputValue(value)

    if (onChange) {
      onChange(value)
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  const renderOptions = useMemo(() => {
    if (items == null) return null

    return items.map(({ label, value, disabled = false }) => {
      const renderLabel = typeof label === 'function' ? label() : label
      return (
        <MenuItem key={renderLabel} value={value} disabled={disabled}>{renderLabel}</MenuItem>
      )
    })
  }, [items])

  const renderValue = useCallback((selected: any) => {
    const item = items!.find(({ value }) => value === selected)

    return typeof item!.label === 'function' ? item!.label() : item!.label
  }, [items])

  const renderHelpText = useMemo(() => {
    if (error != null) {
      const message = _.isArray(error) ? error[0].message : error.message
      return (<FormHelperText>{message}</FormHelperText>)
    }

    if (helpText) {
      return (<FormHelperText>{helpText}</FormHelperText>)
    }
  }, [error, helpText])

  const renderLabel = useLabel(label)

  useEffect(() => {
    if (!_.isEqual(previousValue, value)) {
      onChangeField(value)
      setInputValue(value)
    }
  }, [previousValue, value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormControl fullWidth error={Boolean(error)} required={required} sx={{ mt: 2 }}>
      <InputLabel sx={{ bgcolor: 'white', px: 1 }} id={`id-select-${renderLabel.toLowerCase()}`}>{renderLabel}</InputLabel>
      <Select
        {...field}
        labelId={`id-select-${renderLabel.toLowerCase()}`}
        disabled={disabled}
        value={inputValue}
        renderValue={renderValue}
        onChange={handleOnChange}
      >
        <MenuItem>
          <em>{onlyText('FORM.LABEL.DEFAULT_SELECT')}</em>
        </MenuItem>
        {renderOptions}
      </Select>
      {renderHelpText}
    </FormControl>
  )
}

export default React.memo(SharedSelect)
