import React, { ReactNode } from 'react';
import { TypeSnackBar } from '../components';
export type TypeStatus = any;
interface AppContextProps {
    status: TypeStatus;
    setStatus: React.Dispatch<React.SetStateAction<TypeStatus>>;
    snackBarMessage: TypeSnackBar;
    setSnackBarMessage: (arg: TypeSnackBar) => void;
    pageTitle: string;
    setPageTitle: React.Dispatch<React.SetStateAction<string>>;
}
export declare const useAppContext: () => AppContextProps;
export declare const AppProvider: React.NamedExoticComponent<{
    children?: ReactNode;
    debugReactQuery?: boolean;
}>;
export {};
