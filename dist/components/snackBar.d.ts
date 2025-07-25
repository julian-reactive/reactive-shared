import React from 'react';
export type TypeSeverity = 'error' | 'info' | 'success' | 'warning';
export type TypeSnackBar = string | {
    message: string;
    severity: TypeSeverity;
} | undefined;
export declare const SnackBar: React.NamedExoticComponent<{}>;
