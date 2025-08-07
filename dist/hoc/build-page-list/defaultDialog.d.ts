import React, { ReactElement } from 'react';
import { SxProps } from '@mui/system';
export interface SelectedItemProps {
    id: string | number;
    name: string;
    [key: string]: any;
}
export interface DialogOptionProps {
    icon: ReactElement;
    text: ReactElement;
    to?: string | ((selectedItem: SelectedItemProps) => void);
    onConfirm?: (selectedItem: SelectedItemProps) => void;
    Component?: React.ComponentType<{
        item: SelectedItemProps;
        onClose: () => void;
    }>;
    disabled?: boolean | ((selectedItem: SelectedItemProps) => boolean);
    shouldRender?: (selectedItem: SelectedItemProps) => boolean;
    dialogTitle?: string | ((selectedItem: SelectedItemProps) => string);
    fullScreen?: boolean;
}
export interface DialogOptionsProps {
    [key: string]: DialogOptionProps;
}
interface DefaultDialogProps {
    title: string;
    onClose: () => void;
    options: DialogOptionsProps;
    selectedItem: SelectedItemProps;
    dialogFullScreen: boolean;
    dialogProps?: {
        sx?: SxProps;
    };
}
declare const _default: React.NamedExoticComponent<DefaultDialogProps>;
export default _default;
