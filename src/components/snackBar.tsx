// Libraries
import React, { useCallback, useMemo } from 'react'

// Material Components
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

// Context
import { useAppContext } from '../hoc'

// Interfaces

export type TypeSeverity = 'error' | 'info' | 'success' | 'warning'
export type TypeSnackBar = string | { message: string, severity: TypeSeverity } | undefined

const SnackBarComponent: React.FC = () => {
  const { snackBarMessage, setSnackBarMessage } = useAppContext()

  const handleClose = useCallback(
    () => {
      setSnackBarMessage(undefined)
    },
    [setSnackBarMessage]
  )

  const renderAction = useMemo(() => (
    <Button
      color='primary'
      size='small'
      onClick={handleClose}
    >
      OK
    </Button>
  ), [handleClose])

  const renderMessage = useMemo(() => {
    if (!snackBarMessage) return undefined

    const alertMessage = typeof snackBarMessage === 'object' ? snackBarMessage.message : snackBarMessage
    const alertSeverity = typeof snackBarMessage === 'object' ? snackBarMessage.severity : 'success'

    return (
      <Alert
        elevation={6}
        variant='filled'
        severity={alertSeverity}
        onClose={handleClose}
      >
        {alertMessage}

      </Alert>
    )
  }, [snackBarMessage, handleClose])

  return (
    <Snackbar
      action={renderAction}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={3000}
      onClose={handleClose}
      open={Boolean(snackBarMessage)}
    >
      {renderMessage}
    </Snackbar>
  )
}

export const SnackBar = React.memo(SnackBarComponent)
