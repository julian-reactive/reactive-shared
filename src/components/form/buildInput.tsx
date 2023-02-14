import React, { ReactElement } from 'react'
import {
  ControllerRenderProps, UseFormStateReturn, ControllerFieldState
} from 'react-hook-form'

// Material Components
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SxProps } from '@mui/system'

// Inputs
import TextField from './textField'
import Radio from './radio'
import Select from './select'
import SelectMultiple from './selectMultiple'
import DatePicker from './datePicker'
import NumberFormat from './numberFormat'
import Checkbox from './checkbox'
import Switch from './switch'

import { OnlyTextProps } from '../../utils'

// Interfaces
type HTMLTypeProps = 'checkbox' | 'radio' | 'select' | 'selectMultiple' | 'text' | 'textarea' | 'password' | 'email' | 'number' | 'switch'
type SharedTypeProps = 'numberFormat' | 'divider' | 'datePicker' | 'component'
type TypeProps = HTMLTypeProps | SharedTypeProps

export interface InputProps {
  type: TypeProps
  name: string
  label: string | (() => string)
  yupValidation?: any
  icon?: OverridableComponent<SvgIconTypeMap>
  defaultValue?: any
  sx?: SxProps
  className?: string
  error?: boolean
  errors?: { [key: string]: string }
  parentBox?: { [key: string]: any }
  helpText?: string | string | ((onlyText: OnlyTextProps) => string)
  disabled?: boolean
  InputProps?: any
  multiline?: boolean
  multiple?: boolean
  required?: boolean
  rows?: number
  items?: Array<{ label: string | (() => string), value: string | number, disabled?: boolean }>
  tooltip?: string
  component?: any
  onChange?: any
  value?: any
  incomingValue?: any
  showInput?: boolean
  native?: boolean
}

export interface RenderProps {
  field: ControllerRenderProps<{ [p: string]: any }, string>
  fieldState: ControllerFieldState
  formState: UseFormStateReturn<{ [p: string]: any }>
}

export interface BuildInputProps {
  renderProps: RenderProps
  inputProps: InputProps
  useFormProps?: any
}

export const defaultInputProps: BuildInputProps = {
  renderProps: {
    field: {
      onChange: () => { },
      value: '',
      onBlur: () => { },
      ref: () => { },
      name: ''
    },
    fieldState: {
      error: undefined,
      invalid: false,
      isTouched: false,
      isDirty: false
    },
    formState: {
      isDirty: false,
      dirtyFields: {},
      isSubmitted: false,
      isSubmitSuccessful: false,
      submitCount: 0,
      touchedFields: {},
      isSubmitting: false,
      isValidating: false,
      isValid: true,
      errors: {}
    }
  },
  inputProps: {
    type: 'text' as const,
    name: '',
    label: ''
  }
}

const BuildInputComponent: React.FC<BuildInputProps> = (props: BuildInputProps): ReactElement => {
  switch (props.inputProps.type) {
    case 'checkbox':
      return (<Checkbox {...props} />)
    case 'numberFormat':
      return (<NumberFormat {...props} />)
    case 'divider':
      return (<Box sx={{ mt: 2, mb: 2 }}> <Divider /> </Box>)
    case 'datePicker':
      return (<DatePicker {...props} />)
    case 'radio':
      return (<Radio {...props} />)
    case 'select':
      return (<Select {...props} />)
    case 'selectMultiple':
      return (<SelectMultiple {...props} />)
    case 'switch':
      return (<Switch {...props} />)
    case 'component':
      if (props.inputProps.component !== undefined) return props.inputProps.component(props)

      return (<span>______NO_COMPONENT______</span>)
    default:
      return (<TextField {...props} />)
  }
}

export const BuildInput = React.memo(BuildInputComponent)

export default BuildInput
