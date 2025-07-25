import React, { ReactElement } from 'react';
interface AppTabsProps {
    value?: number;
    tabsHeader: Array<number | string>;
    tabsBody: ReactElement[] | string[];
}
export declare const AppTabs: React.NamedExoticComponent<AppTabsProps>;
export {};
