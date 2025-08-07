// Libraries
import React, { useCallback, useState, useEffect } from 'react'
import isEqual from 'lodash/isEqual'

// Material Components
import TextField from '@mui/material/TextField'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// Shared
import { useLabel, usePreviousValue } from '../../utils'
import { BuildInputProps } from './sharedTypes'

const SharedDatePickerComponent: React.FC<BuildInputProps> = ({
  renderProps: {
    field
  },
  inputProps: {
    label,
    size = 'medium',
    onChange,
    ...inputProps
  }
}) => {
  const previousValue = usePreviousValue(inputProps.value)

  const [value, setValue] = useState(inputProps.value)
  const renderLabel = useLabel(label)

  const handleChange = useCallback((value: any) => {
    setValue(value)
    field.onChange(value)

    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [])

  useEffect(() => {
    if (!isEqual(previousValue, value)) {
      field.onChange(value)
      setValue(value)
    }
  }, [previousValue, value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        {...field}
        {...inputProps}
        label={renderLabel}
        inputFormat='yyyy-MM-DD'
        value={value}
        onChange={handleChange}
        renderInput={(params) => {
          return <TextField {...params} sx={{ mt: 2 }} size={size} />
        }}
      />
    </LocalizationProvider>
  )
}

export const SharedDatePicker = SharedDatePickerComponent

export default React.memo(SharedDatePickerComponent)
