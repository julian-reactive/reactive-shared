import { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
export interface ParamsProps {
    id?: string;
    [key: string]: any;
}
export type HookResultProps<TError, TData = any> = UseMutationResult<AxiosResponse<TData>, TError, ParamsProps | undefined> | UseMutationResult<AxiosResponse<TData>, TError, ParamsProps> | UseQueryResult<AxiosResponse<TData>, TError> | (() => void);
export interface HooksProps {
    [key: `use${string}`]: any;
}
export interface AdditionalEndpointsProps {
    name: string;
    endpoint: string;
    type: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
type UseCreateApiProps = (endpoint: string, additionalEndpoints?: AdditionalEndpointsProps[]) => HooksProps;
export declare const useInvalidateQueries: (queries: string[][]) => () => void;
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
 * @param {AdditionalEndpointsProps[] | undefined} additionalEndpoints - set of additional endpoints
 * @returns react-query hooks for insert in entity context
 */
export declare const useCreateApi: UseCreateApiProps;
/** Create request hooks only with additionalEndpoints configuration */
export declare const createCustomApi: (additionalEndpoints: AdditionalEndpointsProps[]) => HooksProps;
export {};
