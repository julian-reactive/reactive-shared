/* eslint-disable react-hooks/rules-of-hooks,@typescript-eslint/no-empty-function */
import {
  QueryClient,
  useMutation,
  UseMutationResult,
  useQuery as useReactQuery,
  useQueryClient,
  // UseQueryOptions,
  UseQueryResult
} from 'react-query'

import upperFirst from 'lodash/upperFirst'
import isEmpty from 'lodash/isEmpty'
import capitalize from 'lodash/capitalize'

import { AxiosResponse } from 'axios'

// Api
import { api } from './api'

// Interfaces
export type HookResultProps = UseMutationResult<AxiosResponse, unknown, iParams | undefined> |
UseMutationResult<AxiosResponse, unknown, iParams> |
UseQueryResult<AxiosResponse> | (() => void)

export interface iParams {
  id?: string
  [key: string]: any
}

interface ObjectStringProps {
  [key: string]: any
}

export interface HooksProps {
  [key: string]: any
}

interface AdditionalEndpointsProps {
  name: string
  endpoint: string
  type: 'GET' | 'POST'
}

interface UseMutateOptionsProps {
  refetchQueries?: string[]
}

interface QueryParamsProps {
  id?: string
  params?: HooksProps
}

interface QueryOptionsProps {
  idRequired?: boolean
  paramsRequired?: boolean
  [key: string]: any
}

type UseQueryProps = (queryParams: QueryParamsProps, options: QueryOptionsProps) => any

type UseMutateProps = (id: string | null, options: UseMutateOptionsProps) => any

type UseDeleteProps = (options: UseMutateOptionsProps) => any

type UseSetAdditionalEndpointsProps = (arg: {hooks: HooksProps, additionalEndpoints?: AdditionalEndpointsProps[]}) => void

type UseCreateApiProps = (endpoint: string, additionalEndpoints?: AdditionalEndpointsProps[]) => HooksProps

type UseCustomQueryProps = (name: string, endpoint: string) => (queryParams: {id?: string, params?: ObjectStringProps}, options: ObjectStringProps) => any

type UseCustomMutateProps = (endpoint: string) => (id: string | null, options: UseMutateOptionsProps) => any

type OnSuccessMutateProps = (client: QueryClient, queries: string[]) => () => Promise<any>

const onSuccessMutate: OnSuccessMutateProps = (client, queries) => async () => {
  return await Promise.all(queries.map(async (query: any) => await client.refetchQueries(query)))
}

const useCustomQuery: UseCustomQueryProps = (name, endpoint) => (queryParams = {}, options = {}) => {
  const { id = null, params = {} } = queryParams

  if (id !== null) {
    return useReactQuery(name, async () => await api.get(`${endpoint}/${id}`), options)
  }

  return useReactQuery(name, async () => await api.get(endpoint, { params }), options)
}

const useCustomMutation: UseCustomMutateProps = (endpoint) => (id: string | null, options = {}) => {
  const { refetchQueries = [] } = options

  const onSuccess = onSuccessMutate(useQueryClient(), [endpoint, ...refetchQueries])

  return useMutation(async (params) => {
    if (id !== null) return await api.put(`${endpoint}/${id}`, params)
    return await api.post(endpoint, params)
  }, { onSuccess, ...options })
}

/* If `additionalEndpoints` comes, must be an array of {name, endpoint, type} and will be added as ´use${upperFirst(name)}´ hook */
const useSetAdditionalEndpoints: UseSetAdditionalEndpointsProps = ({ hooks, additionalEndpoints = [] }) => {
  additionalEndpoints.forEach(({ name, endpoint, type }) => {
    if (type === 'GET') {
      hooks[`use${upperFirst(name)}`] = useCustomQuery(name, endpoint)
    } else {
      hooks[`use${upperFirst(name)}`] = useCustomMutation(endpoint)
    }
  })
}

/**
 * every entity must have `config/context` file with the following basic code
 * ````
 * ...
 * import React, {ReactElement, ReactNode, useContext} from 'react'
 * const api = useCreateApi('sauce')
 * const SauceAppContext = React.createContext<HooksProps | undefined>(undefined)
 * const SauceAppProviderComponent: React.FC<{ children?: ReactNode }> = ({children}): ReactElement => {
 *   return (
 *     <SauceAppContext.Provider value={api}>
 *       {children}
 *     </SauceAppContext.Provider>
 *   )
 * }
 *
 * export const useSauceAppContext = (): HooksProps => {
 * const context = useContext(SauceAppContext)
 *
 * if (context === undefined) {
 *     throw new Error("AppContext must be within AppProvider -- in Sauce")
 * }
 *
 *  return context
 * }
 *
 *  export const SauceAppProvider = React.memo(SauceAppProviderComponent)
 * ````
 * if `additionalEndpoints` comes, must be an array of {name, endpoint, type} and will be added as ´use${upperFirst(name)}´ hook
 *
 * @param {string} endpoint - endpoint url
 * @param {AdditionalEndpointsProps[]} additionalEndpoints - set of additional endpoints
 * @returns react-query hooks for insert in entity context
 */
export const useCreateApi: UseCreateApiProps = (endpoint, additionalEndpoints) => {
  if (api === undefined) {
    throw new Error('No Api configured')
  }

  const client = useQueryClient()

  const entity = capitalize(endpoint)

  const useMutate: UseMutateProps = async (id = null, options = {}) => {
    const { refetchQueries = [] } = options
    const onSuccess = onSuccessMutate(client, [endpoint, ...refetchQueries])

    if (id !== null) return useMutation(async (params: iParams) => await api.put(`${endpoint}/${id}`, params), { ...options, onSuccess })

    return useMutation(async (params: iParams) => await api.post(endpoint, params), { ...options, onSuccess })
  }

  const useDelete: UseDeleteProps = (options = {}) => {
    const { refetchQueries = [] } = options
    const onSuccess = onSuccessMutate(client, [endpoint, ...refetchQueries])

    return useMutation(async ({ id, ...options }: iParams) => await api.delete(`${endpoint}/${id ?? ''}`, options), { onSuccess, ...options })
  }

  /**
   * @typedef {Object} params - options needed for make requests params are exclusive, id or params. If need to search by id too, insert id on params
   * @param {string | number | undefined} id - id of record
   * @param {iParams} params - params for search
   * @param {boolean} idRequired - if the request needs id as mandatory
   * @param {boolean} paramsRequired - if the request needs id as mandatory
   * @param {*} options :options of react-query useQuery
   * @returns
   */
  const useQuery: UseQueryProps = (
    { id = undefined, params = {} } = {},
    { idRequired = false, paramsRequired = false, ...options } = {}
  ) => {
    if ((idRequired && id === undefined) || (paramsRequired && isEmpty(params))) {
      return () => { }
    }

    if (id !== undefined) {
      return useReactQuery([endpoint, id], async () => await api.get(`${endpoint}/${id}`, { params }), options)
    }

    return useReactQuery([endpoint, params], async () => await api.get(endpoint, { params }), options)
  }

  const hooks: HooksProps = {
    [`use${entity}Delete`]: useDelete,
    [`use${entity}Mutate`]: useMutate,
    [`use${entity}Query`]: useQuery
  }

  if (additionalEndpoints != null) {
    useSetAdditionalEndpoints({ hooks, additionalEndpoints })
  }

  return hooks
}

/** Create request hooks only with additionalEndpoints configuration */
export const createCustomApi = (additionalEndpoints: AdditionalEndpointsProps[]): HooksProps => {
  if (api === undefined) {
    throw new Error('No Api configured')
  }

  const hooks = {}

  useSetAdditionalEndpoints({ hooks, additionalEndpoints })

  return hooks
}
