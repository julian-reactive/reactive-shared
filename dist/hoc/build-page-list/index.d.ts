import React, { NamedExoticComponent, ReactElement } from 'react';
import { SelectedItemProps, DialogOptionsProps } from './defaultDialog';
import { SxProps } from '@mui/system';
/**
 * Object of options for show in dialog when a item is selected.
 *
 * each option must be an object with the following key/value
 * ```
 * {
 *   [name]: {
 *     icon: [MaterialIcon](<AddIcon />),
 *     text: [Text for list item](<Intl langKey="INCOME.LABEL.EDIT" />),
 *     to: [Route for click](routes.income.edit),
 *   }
 *    * }```
 * if there is **to** key, to this route will be added a *selectedItem.id* value.
 *
 * [name] can be used for custom actions:
 * ```
 * const dialogOptions = {
 *   delete: {
 *     icon: <DeleteIcon color="secondary" />,
 *     text: <Intl langKey="INCOME.LABEL.DELETE" color="secondary" />,
 *   }
 * };
 *
 * const Component = () => {
 *   //---...
 *   dialogOptions.delete.onConfirm = async ({ id }) => {
 *     await deleteIncome({ variables: { id } });
 *   };
 *   // ...
 * };
 * ```
 */
/**
 * Used for split content in tabs
 * tabsHeader: label for show in tabhead
 * filterTabs: array of fns for filter content in each tab. Each tab will
 * use the defined component
 */
interface TabsProps {
    tabsHeader: string[];
    filterTabs: Array<(data: any) => SelectedItemProps[]>;
}
type ItemComponentProps = NamedExoticComponent<any> | ((props: {
    item: SelectedItemProps;
    onSelect: () => void;
    [key: string]: any;
    onClose: () => void;
}) => ReactElement);
export interface BuildPageListProps {
    useQuery: any;
    /** add params to request */
    useQueryParams?: {
        params: {
            [key: string]: string | number | boolean;
        };
    };
    useQueryOptions?: {
        [key: string]: any;
    };
    /** URL for ADD page */
    addRoute?: string;
    /** translation string */
    addText?: string;
    /** translation string */
    pageTitle: string;
    dialogOptions?: DialogOptionsProps;
    dialogProps?: SxProps;
    dialogFullScreen?: boolean;
    DialogComponent?: (props: {
        onClose: () => void;
        selectedItem: SelectedItemProps;
        title: string;
        dialogFullScreen: boolean;
    }) => ReactElement;
    loading?: boolean;
    ItemComponent: ItemComponentProps;
    itemComponentProps?: any;
    tabs?: TabsProps;
    SearchComponent?: any;
    MiddleComponent?: any;
    search?: boolean;
    infiniteScroll?: boolean;
}
export declare const BuildPageList: React.NamedExoticComponent<BuildPageListProps>;
export {};
