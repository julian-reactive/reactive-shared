// Libraries
import React, {
  // Dispatch,
  NamedExoticComponent,
  ReactElement,
  // SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { Link } from 'react-router-dom'
// import {UseQueryOptions} from "react-query";
import map from 'lodash/map'

// Material Components
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'

// Icons
import AddIcon from '@mui/icons-material/Add'

// Shared
import { onlyText } from '../../utils'
import { Loading, AppTabs } from '../../components'
import { useAppContext } from '../appContext'

// Components
import DefaultDialog from './defaultDialog'

// Interfaces
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

export interface DialogOptionProps {
  icon: ReactElement
  text: ReactElement
  to?: string | ((selectedItem: SelectedItemProps) => void)
  onConfirm?: (selectedItem: SelectedItemProps) => void
  // Component?: (props: { item: SelectedItemProps, onClose: () => void }) => ReactElement
  Component?: React.ComponentType<{ item: SelectedItemProps, onClose: () => void }>
  disabled?: boolean | ((selectedItem: SelectedItemProps) => boolean)
  shouldRender?: (selectedItem: SelectedItemProps) => boolean
  // Component: ItemComponentProps
}

export interface DialogOptionsProps {
  [key: string]: DialogOptionProps
}

export interface SelectedItemProps {
  id: string | number
  name: string

  [key: string]: any
}

/**
 * Used for split content in tabs
 * tabsHeader: label for show in tabhead
 * filterTabs: array of fns for filter content in each tab. Each tab will
 * use the defined component
 */
interface TabsProps {
  tabsHeader: string[]
  filterTabs: Array<(data: any) => SelectedItemProps[]>
}

type ItemComponentProps =
  NamedExoticComponent<any>
  | ((props: { item: SelectedItemProps, onSelect: () => void, [key: string]: any, onClose: () => void }) => ReactElement)

export interface BuildPageListProps {
  // useQuery: (options?: UseQueryOptions) => UseQueryResult
  useQuery: any
  /** add params to request */
  useQueryParams?: {
    params: {
      [key: string]: string | number | boolean
    }
  }
  /** URL for ADD page */
  addRoute?: string
  /** translation string */
  addText?: string
  /** translation string */
  pageTitle: string
  dialogOptions?: DialogOptionsProps
  dialogFullScreen?: boolean
  DialogComponent?: (props: { onClose: () => void, selectedItem: SelectedItemProps, title: string, dialogFullScreen: boolean }) => ReactElement
  loading?: boolean
  ItemComponent: ItemComponentProps
  itemComponentProps?: any
  tabs?: TabsProps
  SearchComponent?: any
}

/** Component for Create Lists with commons functionalities */
const BuildPageListComponent: React.FC<BuildPageListProps> = ({
  useQuery,
  useQueryParams,
  addRoute,
  pageTitle,
  addText,
  dialogOptions,
  dialogFullScreen = false,
  DialogComponent,
  loading,
  ItemComponent,
  itemComponentProps,
  tabs,
  SearchComponent
}) => {
  const { setPageTitle, setSnackBarMessage } = useAppContext()

  const [searchParams, setSearchParams] = useState()

  const [selectedItem, setSelectedItem] = useState<SelectedItemProps | undefined>(undefined)

  const queryParams = useMemo(() => {
    if (!searchParams) return useQueryParams

    return { params: searchParams }
  }, [useQueryParams, searchParams])

  const { loading: isLoading, data: queryData, error } = useQuery(queryParams)

  const handleSelectItem = useCallback((selectedItem: any) => () => {
    if ((dialogOptions != null) || (DialogComponent != null)) {
      setSelectedItem(selectedItem)
    }
  }, [dialogOptions, DialogComponent])

  const handleOnClose = useCallback(() => setSelectedItem(undefined), [])

  const renderButton = useMemo(() => {
    if (addRoute === undefined) return null

    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, p: 1, pt: 2, pb: 2 }}>
        <Button
          color='primary'
          component={Link}
          to={addRoute}
          variant='contained'
        >
          <AddIcon />
          {onlyText(addText ?? 'GENERAL.ADD')}
        </Button>
      </Box>
    )
  }, [addRoute, addText])

  const renderDialog = useMemo(() => {
    if ((selectedItem == null) || (dialogOptions == null)) return null

    if (DialogComponent != null) {
      return (
        <DialogComponent
          dialogFullScreen={dialogFullScreen}
          onClose={handleOnClose}
          selectedItem={selectedItem}
          title={selectedItem.name ?? onlyText('FORM.LABEL.OPTIONS')}
        />
      )
    }

    if (dialogOptions !== undefined) {
      return (
        <DefaultDialog
          dialogFullScreen={dialogFullScreen}
          onClose={handleOnClose}
          options={dialogOptions}
          selectedItem={selectedItem}
          title={selectedItem.name ?? onlyText('FORM.LABEL.OPTIONS')}
        />
      )
    }
  },
  [
    selectedItem,
    dialogOptions,
    dialogFullScreen,
    handleOnClose,
    DialogComponent
  ]
  )

  const renderList = useMemo(() => {
    if (queryData === undefined) return null

    const { data } = queryData

    if (tabs != null) {
      const tabsBody = tabs.filterTabs.map((fn, idxTab) => {
        const filteredData = fn(data)
        return (
          <List key={`list-tab-${idxTab}`}>
            {map(filteredData, (item, idx) => (
              <ItemComponent
                {...itemComponentProps}
                key={idx}
                item={item}
                onSelect={handleSelectItem}
              />
            ))}
          </List>
        )
      })

      return (
        <AppTabs
          tabsBody={tabsBody}
          tabsHeader={tabs.tabsHeader}
        />
      )
    }

    return (
      <List>
        {map(data, (item, idx) => (
          <ItemComponent
            {...itemComponentProps}
            key={idx}
            item={item}
            onSelect={handleSelectItem}
          />
        ))}
      </List>
    )
  },
  [
    queryData,
    ItemComponent,
    itemComponentProps,
    handleSelectItem,
    tabs
  ]
  )

  const renderLoading = useMemo(() => {
    if (loading === true || isLoading === true) return <Loading backdrop />
  }, [loading, isLoading])

  const renderSearch = useMemo(() => {
    if (SearchComponent === undefined) return null

    return (
      <SearchComponent onSearch={setSearchParams} />
    )
  }, [SearchComponent])

  useEffect(() => {
    setPageTitle(onlyText(pageTitle))
  }, [setPageTitle, pageTitle])

  useEffect(() => {
    if (error instanceof Error) {
      setSnackBarMessage({ message: onlyText('GENERAL.ERROR'), severity: 'error' })
    }
  }, [error, setSnackBarMessage])

  return (
    <Paper>
      {renderDialog}
      {renderButton}
      <Box>
        {renderSearch}
        {renderList}
      </Box>
      {renderLoading}
    </Paper>
  )
}

export const BuildPageList = React.memo(BuildPageListComponent)
