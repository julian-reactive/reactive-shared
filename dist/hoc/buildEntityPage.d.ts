import React, { ComponentType } from 'react';
export interface BuildEntityPageProps {
    routes: Array<{
        index?: boolean;
        path?: string;
        Component: ComponentType;
        roles?: string[];
    }>;
    rol?: string;
}
export declare const BuildEntityPage: React.NamedExoticComponent<BuildEntityPageProps>;
