// Libraries
import React from 'react'

// Material Components
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

// Styles
import { sxLoadingBackdrop } from './styles'

// Interfaces
export interface iLoading {
  backdrop?: boolean
}

const LoadingComponent = ({ backdrop = false }: iLoading) => {
  if (backdrop) {
    return (
      <Backdrop sx={sxLoadingBackdrop} open>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress color='primary' />
    </Box>
  )
}

export const Loading = React.memo(LoadingComponent)
