import React from 'react';
import { SelectedItemProps, DialogOptionsProps } from './index';
import { SxProps } from '@mui/system';
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
