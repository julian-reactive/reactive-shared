import React from 'react';
import { TableProps } from '@mui/material/Table';
export interface AppTableProps extends TableProps {
    headItems: string[];
    bodyItems: any[][];
    size?: 'medium' | 'small';
    className?: string;
}
export declare const AppTable: React.NamedExoticComponent<AppTableProps>;
