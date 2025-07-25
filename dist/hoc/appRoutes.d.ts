import React from 'react';
import { RouteProp } from './sharedRoutes';
interface AppRoutesProps {
    logo: any;
    UserEntity: any;
    MainAppProvider: any;
    mainAppHook: any;
    routes: RouteProp[];
    /** routes excluded for check if user is logged */
    excluded?: string[];
    rol?: string;
}
export declare const AppRoutes: React.NamedExoticComponent<AppRoutesProps>;
export {};
