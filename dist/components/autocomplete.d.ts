import React from 'react';
export interface AutocompleteProps {
    freeSolo?: boolean;
    startAdornment?: any;
    getOptionLabel?: any;
    onChange?: any;
    options?: any;
    renderOption?: any;
    value?: any;
    useQuery?: any;
    inputProps: {
        label: string | (() => string);
        error?: any;
        helpText?: string;
        value?: any;
        incomingValue?: any;
    };
    renderProps?: any;
    useFormProps?: any;
    sx?: {
        [k: string]: any;
    };
    size?: 'small' | 'medium';
    displayField?: string;
}
export declare const Autocomplete: React.NamedExoticComponent<AutocompleteProps>;
