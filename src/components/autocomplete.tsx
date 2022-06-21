import React, { useCallback, useRef, useState, useEffect } from 'react'
import debounce from 'lodash/debounce'
import get from 'lodash/get'

// Material
import MaterialAutocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'

// Shared
import { useLabel } from '../utils'

// Interfaces
export interface AutocompleteProps{
  freeSolo?: boolean
  startAdornment?: any
  getOptionLabel?: any
  onChange?: any
  options?: any
  renderOption?: any
  value?: any
  useQuery?: any
  inputProps: {
    label: string | (() => string)
    error?: any
    helpText?: string
    value?: any
    incomingValue?: any
  }
  renderProps?: any
  useFormProps?: any
  sx?: {[k: string]: any}
  size?: 'small' | 'medium'
}

const defaultUseQuery = () => {
  return {
    isLoading: false,
    data: [],
    refetch: () => { }
  }
}

const SharedAutocomplete: React.FC<AutocompleteProps> = ({
  useQuery = defaultUseQuery,
  options = [],
  startAdornment,
  inputProps,
  renderProps,
  onChange,
  value: fieldValue,
  useFormProps, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  const { field: fieldProps, fieldState: { error } } = renderProps
  const { onChange: onChangeField } = fieldProps
  const { label, helpText, incomingValue } = inputProps

  const [autocompleteValue, setAutocompleteValue] = useState(fieldValue)
  const [inputValue, setInputValue] = useState(inputProps.value || '')
  const [inputOptions, setInputOptions] = useState(options)

  const { isLoading, data, refetch } = useQuery({ params: { key: inputValue } }, { enabled: false })

  const debounceSearch = useRef(debounce(
    () => refetch(),
    1500
  ))

  const renderLabel = useLabel(label)

  const renderInput = useCallback((params: any) => {
    return (
      <TextField
        {...params}
        label={renderLabel}
        InputProps={{
          ...params.InputProps,
          startAdornment: startAdornment,
          endAdornment: (
            <>
              {isLoading && (<CircularProgress color='inherit' size={20} />)}
              {params.InputProps?.endAdornment}
            </>
          )
        }}
        error={Boolean(error)}
        helperText={get(error, 'message', helpText)}
      />
    )
  }, [startAdornment, error, renderLabel, helpText, isLoading])

  const handleChange = useCallback((_, value) => {
    onChangeField(value)
    setAutocompleteValue(value)
    if (onChange) {
      onChange(value)
    }
  }, [onChange])// eslint-disable-line react-hooks/exhaustive-deps

  const handleInputChange = useCallback((_, value) => {
    setInputValue(value)

    onChangeField(value)

    if (value.length < 2) {
      return undefined
    }
    debounceSearch.current()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  // if a value is updated
  useEffect(() => {
    if (incomingValue === undefined || incomingValue === null) return undefined
    setInputValue(incomingValue)

    onChangeField(incomingValue)
  }, [incomingValue])// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (Object.is(useQuery, defaultUseQuery)) {
      return undefined
    }

    if (data?.data?.length) {
      setInputOptions(data.data)
    }
  }, [data, useQuery])

  return (
    <MaterialAutocomplete
      {...props}
      value={autocompleteValue}
      inputValue={inputValue}
      disablePortal
      filterOptions={(x) => x}
      options={inputOptions}
      renderInput={renderInput}
      onInputChange={handleInputChange}
      onChange={handleChange}
      loading={isLoading}
      sx={{ width: 1, ...props.sx }}
    />
  )
}

export const Autocomplete = React.memo(SharedAutocomplete)
