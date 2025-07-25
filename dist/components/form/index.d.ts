import React from 'react';
import { InputProps, RenderProps } from './buildInput';
export interface BuildFormInputProps {
    name: string;
    showInput?: boolean;
    tooltip?: string;
    parentBox: {
        [key: string]: string;
    };
}
export interface InputsFormConfigProps {
    [key: string]: InputProps;
}
export type RenderBuildInputProps = (renderPros: RenderProps, inputProps: InputProps, useFormProps: any) => any;
export interface BuildFormProps {
    loading?: boolean;
    noBackButton?: boolean;
    onBackAction?: () => void;
    backTo?: string | null;
    disabled?: boolean;
    confirmButtonLangkey?: string;
    inputsFormConfig: InputsFormConfigProps;
    responseErrors?: {
        [key: string]: string;
    };
    onSubmit?: (formData: {
        [key: string]: any;
    }) => any;
    defaultSuccessMessage?: boolean;
    formBoxProps?: {
        [key: string]: any;
    };
}
export declare const CreateForm: React.FC<BuildFormProps>;
