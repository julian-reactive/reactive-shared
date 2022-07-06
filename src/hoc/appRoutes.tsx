import React, { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// Material Components
import Box from '@mui/material/Box'

import { NotFound } from '../components'
import AppBar from '../components/app-bar'
import { Loading } from '../components/loading'
import { getLocalStorageValue } from '../utils'

interface RouteProp {
  path: string
  Element: any
}
interface AppRoutesProps {
  logo: any
  UserEntity: any
  MainAppProvider: any
  mainAppHook: any
  routes: RouteProp[]
  /** routes excluded for check if user is logged */
  excluded?: string[]
}

const logged = Boolean(getLocalStorageValue('token'))

const AppRoutesContainer: React.FC<AppRoutesProps> = ({ UserEntity, routes, MainAppProvider, mainAppHook, logo }) => {
  return (
    <Router>
      <MainAppProvider>
        {Boolean(logged) && <AppBar mainAppHook={mainAppHook} logo={logo} />}
        <Box sx={{ mt: logged ? 8 : 0 }}>
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </Box>
      </MainAppProvider>
    </Router>
  )
}

export const AppRoutes = React.memo(AppRoutesContainer)
