import React from 'react';
import { UseMutateFunction, UseMutationOptions, UseQueryOptions, UseQueryResult } from 'react-query';
import { BuildFormProps } from '../components/form';
import { HookResultProps } from '../utils/endpoints';
interface AnyParams {
    [key: string]: any;
}
export type UseMutateActionProps = (id: number | string, useMutateOptions: UseMutationOptions) => HookResultProps;
export type BeforeMutateActionProps = (formData: {
    [key: string]: any;
}, mutate: UseMutateFunction<unknown, unknown, unknown>) => void;
export type UseQueryActionProps = (params: {
    id: number | string;
    params: AnyParams | undefined;
}, options: UseQueryOptions & {
    idRequired: boolean;
}) => UseQueryResult;
export type AfterMutateActionProps = (id: number | string | null, mutateData: any, error: any) => void;
export type AfterQueryActionProps = (formData: AnyParams, data: AnyParams) => void;
export interface ActionsProps {
    /**
     * Hook for get all the form data before send request
     *
     * @param {BuildFormProps} formData - Data build by form inputs
     * @param {(formData:{[key]: any})=>void} mutate - function for make request
     */
    beforeMutate?: BeforeMutateActionProps;
    useMutate: UseMutateActionProps;
    useMutateOptions?: any;
    afterMutate: AfterMutateActionProps;
    useQuery?: UseQueryActionProps;
    useQueryParams?: AnyParams;
    useQueryOptions?: UseQueryOptions;
    afterQuery?: AfterQueryActionProps;
}
export interface BuildPageFormProps {
    entity?: string;
    pageTitle?: string;
    buildFormProps: BuildFormProps;
    actions: ActionsProps;
    removeIdFromForm?: boolean;
    onBackAction?: () => void;
}
export declare const BuildPageForm: React.NamedExoticComponent<BuildPageFormProps>;
export {};
