import React, { useCallback, useMemo, useEffect, useState } from 'react'
import isArray from 'lodash/isArray'
import isEqual from 'lodash/isEqual'

// Material Components
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'

// Shared
import { BuildInputProps } from './sharedTypes'
import { onlyText, usePreviousValue, useLabel } from '../../utils'

type SelectProps = BuildInputProps & {
  inputProps: {
    native? :boolean
  }
}

export const SharedSelect: React.FC<SelectProps> = ({
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
    items = [],
    onChange,
    disabled,
    value,
    native = false,
    fullWidth = true,
    formControlSx = {},
    size = 'medium'
  }
}) => {
  const previousValue = usePreviousValue(value)

  const [inputValue, setInputValue] = useState(field.value || value || '')

  const handleOnChange = useCallback((evt: SelectChangeEvent) => {
    const { value } = evt.target

    onChangeField(value)
    setInputValue(value)

    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [onChangeField, onChange])

  const renderOptions = useMemo(() => {
    return items.map(({ label, value, disabled = false }) => {
      const renderLabel = typeof label === 'function' ? label() : label

      if (native) return <option key={renderLabel} value={value} disabled={disabled}>{renderLabel}</option>

      return (
        <MenuItem key={renderLabel} value={value} disabled={disabled}>{renderLabel}</MenuItem>
      )
    })
  }, [items, native])

  const renderValue = useCallback((selected: any) => {
    if (items.length === 0) return ''

    const item = items.find(({ value }) => value === selected)

    if (item?.label === undefined) return ''

    return typeof item.label === 'function' ? item.label() : item.label
  }, [items])

  const renderHelpText = useMemo(() => {
    if (error != null) {
      const message = isArray(error) ? error[0].message : error.message
      return (<FormHelperText>{message}</FormHelperText>)
    }

    if (helpText !== undefined) {
      const text = typeof helpText === 'string' ? helpText : helpText(onlyText)

      return (<FormHelperText>{text}</FormHelperText>)
    }
  }, [error, helpText])

  const renderLabel = useLabel(label)

  const defaultSelect = onlyText('FORM.LABEL.DEFAULT_SELECT')

  useEffect(() => {
    if (!isEqual(previousValue, value)) {
      onChangeField(value)
      setInputValue(value)
    }
  }, [previousValue, value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormControl fullWidth={fullWidth} error={Boolean(error)} required={required} sx={{ mt: 2, ...formControlSx }} size={size}>
      <InputLabel sx={{ bgcolor: 'white', px: 1 }} id={`id-select-${renderLabel.toLowerCase()}`}>{renderLabel}</InputLabel>
      <Select
        {...field}
        native={native}
        labelId={`id-select-${renderLabel.toLowerCase()}`}
        disabled={disabled}
        value={inputValue}
        renderValue={renderValue}
        onChange={handleOnChange}
      >
        {native ? (<option>{defaultSelect}</option>) : (<MenuItem><em>{defaultSelect}</em></MenuItem>)}
        {renderOptions}
      </Select>
      {renderHelpText}
    </FormControl>
  )
}

export default React.memo(SharedSelect)
