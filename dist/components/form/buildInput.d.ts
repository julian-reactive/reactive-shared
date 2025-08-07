import React from 'react';
import { BuildInputProps } from './sharedTypes';
export declare const defaultInputProps: BuildInputProps;
export declare const defaultProps: ({ onChange, value, name, label, type, ...otherProps }: {
    onChange: (value: string) => void;
    value: number;
    name: string;
    label: string;
    type: string;
} & BuildInputProps) => BuildInputProps;
export declare const BuildInput: React.FC<BuildInputProps>;
export default BuildInput;
