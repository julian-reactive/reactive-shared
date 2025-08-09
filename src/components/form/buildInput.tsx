import React, { ReactElement } from 'react'

import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

// Material Components
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

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
import File from './file'

import { BuildInputProps } from './sharedTypes'

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
    case 'file':
      return (<File {...props} />)
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
