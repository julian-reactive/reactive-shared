import React, { Suspense } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

// Material Components
import Box from '@mui/material/Box'


import AppBar from '../components/app-bar'
import { Loading } from '../components/loading'
import { getLocalStorageValue } from '../utils'

import SharedRoutes, { RouteProp } from './sharedRoutes'
interface AppRoutesProps {
  logo: any
  UserEntity: any
  MainAppProvider: any
  mainAppHook: any
  routes: RouteProp[]
  /** routes excluded for check if user is logged */
  excluded?: string[]
  rol?: string
}

const logged = Boolean(getLocalStorageValue('token'))

const AppRoutesContainer: React.FC<AppRoutesProps> = ({ logo, MainAppProvider, UserEntity, routes, mainAppHook }) => {
  return (
    <Router>
      <MainAppProvider>
        {Boolean(logged) && <AppBar mainAppHook={mainAppHook} logo={logo} />}
        <Box sx={{ mt: logged ? 8 : 0 }}>
          <Suspense fallback={<Loading />}>
            <SharedRoutes routes={routes} mainAppHook={mainAppHook} UserEntity={UserEntity} />
          </Suspense>
        </Box>
      </MainAppProvider>
    </Router>
  )
}

export const AppRoutes = React.memo(AppRoutesContainer)
