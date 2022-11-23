// Libraries
import React, { useCallback, useState } from 'react'

// Material Components
import TextField from '@mui/material/TextField'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// Shared
import { useLabel } from '../../utils'
import { BuildInputProps } from './buildInput'

const SharedDatePicker: React.FC<BuildInputProps> = ({
  renderProps: {
    field
  },
  inputProps: {
    label,
    ...inputProps
  }
}) => {
  const [value, setValue] = useState(inputProps.value)
  const renderLabel = useLabel(label)

  const handleChange = useCallback(value => {
    setValue(value)
    field.onChange(value)
  }, [])

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <MobileDatePicker
        {...field}
        label={renderLabel}
        inputFormat='yyyy-MM-DD'
        value={value}
        onChange={handleChange}
        renderInput={(params) => {
          return <TextField {...params} sx={{ width: 1, mt: 2 }} />
        }}
      />
    </LocalizationProvider>
  )
}

export default React.memo(SharedDatePicker)
