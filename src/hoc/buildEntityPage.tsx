import React, { ComponentType } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'

export interface BuildEntityPageProps {
  routes: Array<{
    index?: boolean
    path?: string
    Component: ComponentType
  }>
}

const BuildEntityPageComponent: React.FC<BuildEntityPageProps> = ({ routes }) => {
  return (
    <>
      <Routes>
        {routes.map(({ index = false, path, Component }) => (
          <Route key={path} index={index} path={path} element={<Component />} />
        ))}
      </Routes>
      <Outlet />
    </>
  )
}

export const BuildEntityPage = React.memo(BuildEntityPageComponent)
