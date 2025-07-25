import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';
export interface BasicNumberFormatProps {
    name: string;
    label: string;
    onChange: (value: string) => void;
    value: string | number;
    sx?: SxProps<Theme>;
}
export declare const SharedBasicNumberFormat: React.NamedExoticComponent<BasicNumberFormatProps>;
