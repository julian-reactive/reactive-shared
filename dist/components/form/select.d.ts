import React from 'react';
import { BuildInputProps } from './sharedTypes';
type SelectProps = BuildInputProps & {
    inputProps: {
        native?: boolean;
    };
};
export declare const SharedSelect: React.FC<SelectProps>;
declare const _default: React.NamedExoticComponent<SelectProps>;
export default _default;
