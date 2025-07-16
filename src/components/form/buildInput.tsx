import React, { ReactElement } from 'react'
import {
  ControllerRenderProps, UseFormStateReturn, ControllerFieldState
} from 'react-hook-form'
import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

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
import DateTimePicker from './datetimePicker'
import NumberFormat from './numberFormat'
import Checkbox from './checkbox'
import Switch from './switch'

import { OnlyTextProps } from '../../utils'

// Interfaces
type HTMLTypeProps = 'checkbox' | 'radio' | 'select' | 'selectMultiple' | 'text' | 'textarea' | 'password' | 'email' | 'number' | 'switch'
type SharedTypeProps = 'numberFormat' | 'divider' | 'datePicker' | 'dateTimePicker' | 'component'
type TypeProps = HTMLTypeProps | SharedTypeProps

export interface InputProps {
  type: TypeProps
  name: string
  label: string | (() => string)
  yupValidation?: any
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string; }
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
  fullWidth?: boolean
  [k: string]: unknown
}

export interface RenderProps {
  field: ControllerRenderProps<{ [p: string]: any }, string>
  fieldState: ControllerFieldState & { error?: any }
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
      isLoading: false,
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

export const defaultProps = ({
  onChange,
  value,
  name,
  label,
  type,
  ...otherProps
}: {
  onChange: (value: string) => void,
  value: number,
  name: string,
  label: string,
  type: string
} & BuildInputProps) => {
  const props = merge(
    cloneDeep(defaultInputProps),
    {
      renderProps: {
        field: {
          onChange,
          value,
          name
        }
      }
    },
    {
      inputProps: {
        ...cloneDeep(defaultInputProps.inputProps),
        type,
        label,
        name,
        value,
        size: 'small',
        sx: {
          marginTop: '1px'
        }
      }
    },
    otherProps
  )

  return { ...props } as BuildInputProps
}

const BuildInputComponent: React.FC<BuildInputProps> = (props: BuildInputProps): ReactElement => {
  // React DevTools will automatically show this component's props and state
  // You can also add a displayName for easier identification
  BuildInputComponent.displayName = `BuildInput-${props.inputProps.type}`

  switch (props.inputProps.type) {
    case 'checkbox':
      return (<Checkbox {...props} />)
    case 'numberFormat':
      return (<NumberFormat {...props} />)
    case 'divider':
      return (<Box sx={{ mt: 2, mb: 2 }}> <Divider /> </Box>)
    case 'datePicker':
      return (<DatePicker {...props} />)
    case 'dateTimePicker':
      return (<DateTimePicker {...props} />)
    case 'radio':
      return (<Radio {...props} />)
    case 'select':
      return (<Select {...props} />)
    case 'selectMultiple':
      return (<SelectMultiple {...props} />)
    case 'switch':
      return (<Switch {...props} />)
    case 'component':
      if (props.inputProps.component !== undefined) {
        const Component = props.inputProps.component
        return (<Component {...props} />)
      }

      return (<span>______NO_COMPONENT______</span>)
    default:
      return (<TextField {...props} />)
  }
}

export const BuildInput = BuildInputComponent

export default BuildInput
