import React from 'react';
import { DialogProps } from '@mui/material/Dialog';
interface SharedDialogProps extends DialogProps {
    children: any;
    onClose?: () => void;
    open: boolean;
    title: string;
}
export declare const Dialog: React.NamedExoticComponent<SharedDialogProps>;
export {};
