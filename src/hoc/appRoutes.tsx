import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// Material Components
import Box from '@mui/material/Box'

import { NotFound } from '../components'
import AppBar from '../components/app-bar'
import { getLocalStorageValue } from '../utils'

interface RouteProp {
  path: string
  Element: any
}
interface AppRoutesProps {
  UserEntity: any
  MainAppProvider: any
  mainAppHook: any
  routes: RouteProp[]
  /** routes excluded for check if user is logged */
  excluded?: string[]
}

const logged = Boolean(getLocalStorageValue('token'))

const AppRoutesContainer: React.FC<AppRoutesProps> = ({ UserEntity, routes, MainAppProvider, mainAppHook }) => {
  return (
    <Router>
      <MainAppProvider>
        {Boolean(logged) && <AppBar mainAppHook={mainAppHook} />}
        <Box sx={{ mt: logged ? 8 : 0 }}>
          <Routes>
            {logged && (
              routes.map(({ Element, ...route }) => {
                return <Route key={route.path} {...route} element={<Element />} />
              })
            )}
            <Route
              path='/user/*'
              element={<UserEntity />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
      </MainAppProvider>
    </Router>
  )
}

export const AppRoutes = React.memo(AppRoutesContainer)
