// Libraries
import React from 'react'

// Material Components
import TextField from '@mui/material/TextField'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

// Shared
import { useLabel } from '../../utils'
import { BuildInputProps } from './buildInput'

const SharedDatePicker: React.FC<BuildInputProps> = ({
  renderProps: {
    field
  },
  inputProps: {
    label
  }
}) => {
  const renderLabel = useLabel(label)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        {...field}
        label={renderLabel}
        inputFormat='yyyy-MM-dd'
        renderInput={(params) => <TextField {...params} sx={{ width: 1 }} />}
      />
    </LocalizationProvider>
  )
}

export default React.memo(SharedDatePicker)
