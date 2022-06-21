import React from 'react'

import NumberFormat, { NumberFormatProps } from 'react-number-format'

import TextField from './textField'
import { BuildInputProps } from './buildInput'

interface CustomProps {
  onChange: (event: { target: { name: string, value: string } }) => void
  name: string
}

const NumberFormatCustom = React.forwardRef<NumberFormatProps, CustomProps>(({ onChange, ...props }, ref) => {
  return (
    <NumberFormat
      {...props}
      getInputRef={ref}
      onValueChange={({ value }) => {
        onChange({
          target: {
            name: props.name,
            value
          }
        })
      }}
      thousandSeparator='.'
      decimalSeparator=','
      isNumericString
    />
  )
})

NumberFormatCustom.displayName = 'NumberFormatCustom'

const SharedNumberFormatComponent: React.FC<BuildInputProps> = ({ renderProps, inputProps }) => {
  return (
    <TextField
      renderProps={renderProps}
      inputProps={{
        ...inputProps,
        InputProps: {
          inputComponent: NumberFormatCustom as any
        }
      }}
    />
  )
}

export const SharedNumberFormat = React.memo(SharedNumberFormatComponent)

export default React.memo(SharedNumberFormatComponent)
