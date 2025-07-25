import React from 'react';
export interface MenuItemsProps {
    name: string;
    icon: any;
    path: string;
    divider?: boolean;
    disabled?: boolean;
}
interface MenuProps {
    isMenuOpen: boolean;
    onCloseMenu: any;
    menuItems: MenuItemsProps[];
}
declare const _default: React.NamedExoticComponent<MenuProps>;
export default _default;
