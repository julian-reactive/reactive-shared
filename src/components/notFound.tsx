import React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

const NotFoundComponent: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper>
          <Box p={5}>
            <h1 className='display-3'>404!</h1>
            <p className='lead'>Page not found</p>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  )
}

export const NotFound = React.memo(NotFoundComponent)
