// Libraries
import React from 'react'

// Material Components
import TextField from '@mui/material/TextField'
import MobileDatePicker from '@mui/lab/MobileDatePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

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
