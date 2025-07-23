import React, { useCallback, useEffect, useState } from 'react'
import  { NumericFormat, NumericFormatProps } from 'react-number-format'

import { SxProps, Theme } from '@mui/material/styles'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { sxTextField } from './form/styles'

export interface BasicNumberFormatProps {
  name: string,
  label: string,
  onChange: (value: string) => void,
  value: string | number,
  sx?: SxProps<Theme>
}

const BasicNumberFormatCustom = React.forwardRef<HTMLInputElement, NumericFormatProps & { name?: string; onChange?: (event: any) => void }>(
  ({ onChange, name, ...props }, ref) => {
    return (
      <NumericFormat
        {...props}
        getInputRef={ref}
        onValueChange={({ value }) => {
          if (onChange) {
            onChange({
              target: {
                name: name!,
                value
              }
            })
          }
        }}
        thousandSeparator='.'
        decimalSeparator=','
      />
    )
  }
)
BasicNumberFormatCustom.displayName = 'BasicNumberFormatCustom'

const BasicNumberFormat: React.FC<BasicNumberFormatProps> = ({ name, label, value, onChange, sx }) => {
  const [inputValue, setValue] = useState(value || '')
  const handleChange = useCallback((evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { value } = evt.target
    setValue(value)
    if (typeof onChange === 'function') {
      onChange(value)
    }
  }, [onChange])

  useEffect(() => {
    setValue(value || '')
  }, [value])

  return (
    <TextField
      fullWidth
      margin='normal'
      name={name}
      label={label}
      value={inputValue}
      sx={{ ...sxTextField, ...sx }}
      size='small'
      InputProps={{
        inputComponent: BasicNumberFormatCustom as any,
        startAdornment: (
          <InputAdornment position='start'>
            <AttachMoneyIcon color='action' />
          </InputAdornment>
        )
      }}
      onChange={handleChange}
    />
  )
}

export const SharedBasicNumberFormat = React.memo(BasicNumberFormat)
