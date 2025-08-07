import React, { ReactNode } from 'react';
import { TypeSnackBar } from '../components/sharedTypes';
export type TypeStatus = any;
export interface AppContextProps {
    status: TypeStatus;
    setStatus: React.Dispatch<React.SetStateAction<TypeStatus>>;
    snackBarMessage: TypeSnackBar;
    setSnackBarMessage: (arg: TypeSnackBar) => void;
    pageTitle: string;
    setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}
export declare const AppContext: React.Context<AppContextProps | undefined>;
export declare const AppProvider: React.NamedExoticComponent<{
    children?: ReactNode;
    debugReactQuery?: boolean;
}>;
