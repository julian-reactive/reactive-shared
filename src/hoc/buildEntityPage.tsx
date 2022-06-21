import React, { ComponentType, useMemo } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

export interface BuildEntityPageProps {
  routes: Array<{
    index?: boolean
    path?: string
    Component: ComponentType
  }>
}

const BuildEntityPageComponent: React.FC<BuildEntityPageProps> = ({ routes }) => {
  const routesMemoized = useMemo(() => {
    return routes.map(({ index = false, path, Component }) => (
      <Route key={path} index={index} path={path} element={<Component />} />
    ))
  }, [routes]
  )

  return (
    <>
      <Routes>
        {routesMemoized}
      </Routes>
      <Outlet />
    </>
  )
}

export const BuildEntityPage = React.memo(BuildEntityPageComponent)
