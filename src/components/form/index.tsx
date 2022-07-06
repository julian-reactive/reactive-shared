// Libraries
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object } from 'yup'

// Lodash
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import each from 'lodash/each'

// Material Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Tooltip from '@mui/material/Tooltip'

// Intl
import { Intl, onlyText } from '../../utils'

// Build Input
import BuildInput, { InputProps, RenderProps } from './buildInput'

// #region

// Types
interface tAnyObject {
  [key: string]: any
}

// Interfaces
export interface BuildFormInputProps {
  name: string
  showInput?: boolean
  tooltip?: string
  parentBox: { [key: string]: string }
}

export interface InputsFormConfigProps { [key: string]: InputProps }

export interface BuildFormProps {
  loading?: boolean
  noBackButton?: boolean
  backTo?: string | null
  disabled?: boolean
  confirmButtonLangkey?: string
  inputsFormConfig: InputsFormConfigProps
  responseErrors?: { [key: string]: string }
  onSubmit?: (arg0: tAnyObject) => void
  defaultSuccessMessage?: boolean
}

export type RenderBuildInputProps = (renderPros: RenderProps, inputProps: InputProps, useFormProps: any) => any

// #endregion

const CreateFormContainer: React.FC<BuildFormProps> = ({
  loading,
  noBackButton = false,
  backTo = '',
  disabled,
  confirmButtonLangkey = '',
  inputsFormConfig,
  responseErrors,
  onSubmit
}) => {
  const navigate = useNavigate()
  const formValues = useRef<any>()

  const [validationSchema]: [any, any] = useState(() => {
    const fields: { [key: string]: any } = reduce(inputsFormConfig, (prev, { name, yupValidation }) => ({
      ...prev,
      [name]: yupValidation
    }), {})

    return object().shape(fields)
  })

  const handleBackAction = useCallback(() => {
    if (typeof backTo === 'string') {
      navigate(backTo)
    } else {
      navigate(-1)
    }
  }, [navigate, backTo])

  const {
    control,
    handleSubmit,
    setError,
    ...useFormProps
  } = useForm<{ [key: string]: any }>({ resolver: yupResolver(validationSchema) })

  if (process.env.NODE_ENV === 'development') {
    formValues.current = useFormProps.getValues() // debug form values in component
  }

  const buildForm = useMemo(() => {
    return map(inputsFormConfig, ({
      showInput = true,
      tooltip,
      parentBox = {},
      yupValidation, //eslint-disable-line
      ...inputProps
    }: BuildFormInputProps & InputProps, key) => {
      if (!showInput) {
        return null
      }

      if (tooltip !== undefined) {
        return (
          <Box key={key} mt={1} {...parentBox}>
            <Tooltip title={onlyText(tooltip)} arrow placement='top'>
              <div>
                <Controller
                  key={key}
                  name={inputProps.name}
                  control={control}
                  render={(renderProps) => <BuildInput renderProps={renderProps} inputProps={inputProps} useFormProps={useFormProps} />}
                />
              </div>
            </Tooltip>
          </Box>
        )
      }

      return (
        <Box key={key} mt={1} {...parentBox}>
          <Controller
            key={key}
            name={inputProps.name}
            control={control}
            render={(renderProps) => <BuildInput renderProps={renderProps} inputProps={inputProps} useFormProps={useFormProps} />}
          />
        </Box>
      )
    }
    )
  }, [inputsFormConfig, control, useFormProps])

  const backButton = useMemo(() => {
    if (noBackButton) return null

    return (
      <Box mr={3}>
        <Button
          disabled={loading}
          variant='contained'
          color='secondary'
          onClick={handleBackAction}
          disableElevation
        >
          <Intl langKey='GENERAL.BACK' />
        </Button>
      </Box>
    )
  }, [noBackButton, handleBackAction, loading])

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && !isEmpty(useFormProps?.formState?.errors)) {
      console.log('useFormProps', useFormProps.getValues())
      console.log('errors in form', useFormProps.formState.errors)
    }
  }, [useFormProps])

  console.log('useFormProps.formState.errors', useFormProps.formState.errors)

  useEffect(() => {
    if (!isEmpty(responseErrors)) {
      each(responseErrors, (error, name) => {
        setError(name, { type: 'error', message: onlyText(`SERVER.VALIDATION.ERROR.${error[0]}`) })
      })
    }
  }, [responseErrors, setError])

  return (
    <form autoComplete='off' data-testid='form' onSubmit={handleSubmit(onSubmit!)}>
      <Box>
        {buildForm}
      </Box>

      <Box
        display='flex'
        justifyContent={noBackButton ? 'flex-end' : 'space-between'}
        pb={4}
        pt={6}
      >
        {backButton}
        <Button
          color='primary'
          disableElevation
          disabled={loading || disabled || !useFormProps.formState.isDirty}
          type='submit'
          variant='contained'
        >
          {Boolean(loading) &&
            <CircularProgress
              data-testid='circular-progress'
              size={20}
            />}

          <Intl langKey={confirmButtonLangkey} />
        </Button>
      </Box>
    </form>
  )
}

export const CreateForm = React.memo(CreateFormContainer)
