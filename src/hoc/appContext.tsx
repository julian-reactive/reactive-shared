import React, { ReactNode, useState, ReactElement } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// SnackBar
import { SnackBar } from '../components/snackBar'
import { TypeSnackBar } from '../components/sharedTypes'

// import { AxiosResponse } from 'axios'

// Types
// export type TypeStatus = AxiosResponse<{ type:string, [key:string]: any }> | undefined
export type TypeStatus = any

export interface AppContextProps {
  status: TypeStatus
  setStatus: React.Dispatch<React.SetStateAction<TypeStatus>>
  snackBarMessage: TypeSnackBar
  setSnackBarMessage: (arg: TypeSnackBar) => void
  pageTitle: string
  setPageTitle: React.Dispatch<React.SetStateAction<string>>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60
    }
  }
})

export const AppContext = React.createContext<AppContextProps | undefined>(undefined)

const AppProviderComponent: React.FC<{ children?: ReactNode, debugReactQuery?: boolean }> = ({ children, debugReactQuery = false }): ReactElement => {
  const [status, setStatus] = useState<TypeStatus>()
  const [snackBarMessage, setSnackBarMessage] = useState<TypeSnackBar>()
  const [pageTitle, setPageTitle] = useState('')

  const value: AppContextProps = {
    status,
    setStatus,
    snackBarMessage,
    setSnackBarMessage,
    pageTitle,
    setPageTitle
  }

  return (
    <AppContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>
        {children}
        <SnackBar snackBarMessage={snackBarMessage} setSnackBarMessage={setSnackBarMessage} />
        {debugReactQuery && <ReactQueryDevtools />}

      </QueryClientProvider>
    </AppContext.Provider>
  )
}

export const AppProvider = React.memo(AppProviderComponent)
