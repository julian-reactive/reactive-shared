import React from 'react'

import { NumericFormat, NumericFormatProps } from 'react-number-format'

import TextField from './textField'
import { BuildInputProps } from './sharedTypes'

interface CustomProps {
  onChange: (event: { target: { name: string, value: string } }) => void
  name: string
}

const NumberFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(({ onChange, ...props }, ref) => {
  return (
    <NumericFormat
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
      decimalScale={2}
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
