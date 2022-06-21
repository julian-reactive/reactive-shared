import React, { useCallback, useEffect, useMemo, useRef } from 'react'

import {
  UseMutateFunction,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult
} from 'react-query'

import { useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import each from 'lodash/each'

// Material Components
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

// Context
import { useAppContext } from './appContext'

// Shared
import { CreateForm, BuildFormProps, Loading, InputsFormConfigProps } from '../components'
import { HookResultProps, onlyText } from '../utils'

// Interfaces
interface AnyParams { [key: string]: any }
export type UseMutateActionProps = (id: number | string, useMutateOptions: UseMutationOptions) => HookResultProps
export type BeforeMutateActionProps = (formData: { [key: string]: any }, mutate: UseMutateFunction<unknown, unknown, unknown>) => void
export type UseQueryActionProps = (params: { id: number | string, params: AnyParams | undefined }, options: UseQueryOptions & { idRequired: boolean }) => UseQueryResult
export type AfterMutateActionProps = (id: number | string | null, mutateData: any, error: any) => void

export interface ActionsProps {
  /**
   * Hook for get all the form data before send request
   *
   * @param {BuildFormProps} formData - Data build by form inputs
   * @param {(formData:{[key]: any})=>void} mutate - function for make request
   */
  beforeMutate?: BeforeMutateActionProps
  useMutate: UseMutateActionProps
  useMutateOptions?: any
  afterMutate: AfterMutateActionProps
  useQuery?: UseQueryActionProps
  useQueryParams?: AnyParams
  useQueryOptions?: UseQueryOptions
  afterQuery?: (formData: AnyParams, data: AnyParams) => void
}

export interface BuildPageFormProps {
  entity?: string
  pageTitle?: string
  buildFormProps: BuildFormProps
  actions: ActionsProps
}

const BuildPageFormContainer: React.FC<BuildPageFormProps> = ({
  entity,
  pageTitle,
  buildFormProps: {
    defaultSuccessMessage = true,
    noBackButton = false,
    disabled = false,
    confirmButtonLangkey,
    inputsFormConfig
  },
  actions: {
    beforeMutate,
    useMutate,
    useMutateOptions = {},
    afterMutate,
    useQuery = () => ({}),
    useQueryParams,
    useQueryOptions = {},
    afterQuery
  }
}) => {
  const { setPageTitle, setSnackBarMessage } = useAppContext()
  const { id = '' } = useParams()

  const afterQueryCalled = useRef(false)
  const dataSet = useRef(false)

  const { mutate, isSuccess, error, isLoading: adding, data: mutateData }: any = useMutate(id, useMutateOptions)

  const { isLoading = false, data: queryData = {} }: any = useQuery({ id, params: useQueryParams }, {
    enabled: Boolean(id),
    idRequired: true,
    ...useQueryOptions
  })

  const handleSubmit = useCallback((formData) => {
    if (id) {
      formData.id = id
    }

    if (beforeMutate != null) {
      beforeMutate(formData, mutate)
    } else {
      mutate(formData)
    }
  }, [beforeMutate, mutate, id])

  const errors = useMemo(() => {
    if (mutateData?.status === 'error') {
      return mutateData?.errors
    }

    return {}
  }, [mutateData])

  /** set data for form */
  const formData = useMemo<InputsFormConfigProps>(() => {
    const { data = {} } = queryData

    if (isEmpty(data)) return inputsFormConfig

    if (!dataSet.current) {
      each(inputsFormConfig, fieldProps => {
        if (data[fieldProps.name]) {
          fieldProps.value = data[fieldProps.name]
          fieldProps.disabled = false
        }
      })
    }
    dataSet.current = true

    if ((afterQuery != null) && !afterQueryCalled.current) {
      afterQuery(inputsFormConfig, data)
    }

    afterQueryCalled.current = true

    return inputsFormConfig
  }, [queryData, inputsFormConfig, afterQuery])

  /** set title */
  useEffect(() => {
    if (pageTitle) {
      setPageTitle(onlyText(pageTitle))
    } else {
      const title = `${entity!.toLocaleUpperCase()}.${id ? 'EDIT' : 'ADD'}.TITLE`
      setPageTitle(onlyText(title))
    }
  }, [id, setPageTitle, entity, pageTitle])

  /** when a mutation is made */
  useEffect(() => {
    if (isSuccess && mutateData?.status === 'success') {
      if (defaultSuccessMessage) {
        setSnackBarMessage(onlyText('GENERAL.ADD_SUCCESS'))
      }

      if (!error && !mutateData?.data) {
        throw new Error('something is wrong with response format')
      }

      afterMutate(id, mutateData?.data, error)
    }

    if (error instanceof Error) {
      setSnackBarMessage({ message: onlyText('GENERAL.ERROR'), severity: 'error' })
    }
  },
  [isSuccess, error, mutateData, id, afterMutate, setSnackBarMessage, defaultSuccessMessage]
  )

  if (id && (isLoading || isEmpty(queryData))) {
    return <Loading backdrop />
  }

  return (
    <Paper>
      <Box sx={{ mt: 2, p: 2 }}>
        <CreateForm
          loading={adding}
          disabled={disabled}
          noBackButton={noBackButton}
          confirmButtonLangkey={confirmButtonLangkey || (id ? 'GENERAL.EDIT' : 'GENERAL.ADD')}
          inputsFormConfig={formData}
          responseErrors={errors}
          onSubmit={handleSubmit}
        />
      </Box>
    </Paper>
  )
}

export const BuildPageForm = React.memo(BuildPageFormContainer)
