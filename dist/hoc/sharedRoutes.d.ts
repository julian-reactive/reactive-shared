import React from 'react';
export interface RouteProp {
    path: string;
    Element: any;
    roles?: string[];
    disabled?: boolean | ((status: any) => boolean);
}
interface SharedRoutesProps {
    routes: RouteProp[];
    mainAppHook: any;
    UserEntity: any;
}
declare const _default: React.NamedExoticComponent<SharedRoutesProps>;
export default _default;
