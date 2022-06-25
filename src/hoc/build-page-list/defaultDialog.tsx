// Libraries
import React, { useCallback, useMemo, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import map from 'lodash/map'
// Import isEmpty from 'lodash/isEmpty'

// Material components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

// Icons
import CloseIcon from '@mui/icons-material/Close'

// Intl
import { Intl } from '../../utils'

// Styles
import { sxCloseDialogButton } from './sx'

// Interface
import { SelectedItemProps, DialogOptionsProps, DialogOptionProps } from './index'

// #region
interface DefaultDialogProps {
  title: string
  onClose: () => void
  options: DialogOptionsProps
  selectedItem: SelectedItemProps
  dialogFullScreen: boolean
}

// type ActionToConfirmProps = ((selectedItem: any) => void) | undefined

type HandleClickProps = (options: DialogOptionProps, key: string) => () => void

// #endregion

const DefaultDialogComponent: React.FC<DefaultDialogProps> = ({ options, title, onClose, selectedItem, dialogFullScreen }) => {
  const navigate = useNavigate()
  const [showRender, setShowRender] = useState('renderOptionList')
  const [selectedOption, setSelectedOption] = useState('')
  const actionToConfirm = useRef<any>()

  const handleClick = useCallback<HandleClickProps>(({ to, onConfirm, Component }, key) => () => {
    setSelectedOption(key)

    if (typeof to === 'string' && to !== '') {
      navigate(`${to}/${selectedItem.id}`)
    } else if (typeof to === 'function') {
      to(selectedItem)
    }

    if (Component !== undefined) {
      setShowRender('renderItemComponent')
    }

    if (onConfirm !== undefined) {
      actionToConfirm.current = onConfirm
      setShowRender('renderConfirmBox')
    }
  }, [navigate, selectedItem.id])

  const handleConfirmClick = useCallback(async () => {
    if (typeof actionToConfirm.current === 'function') {
      await actionToConfirm.current(selectedItem)
    }
    onClose()
  }, [selectedItem, onClose])

  const renderOptionsList = useMemo(() => {
    return (
      <List>
        {map(options, (option, key) => {
          const shouldRender = typeof option.shouldRender === 'function' ? option.shouldRender(selectedItem) : true
          const disabled = typeof option.disabled === 'function' ? option.disabled(selectedItem) : option.disabled

          if (!shouldRender) return null

          return (
            <ListItemButton key={key} divider onClick={handleClick(option, key)} disabled={disabled}>
              <ListItemAvatar>{option.icon}</ListItemAvatar>
              <ListItemText primary={option.text} />
            </ListItemButton>
          )
        }
        )}
      </List>
    )
  }, [options, handleClick])

  const renderConfirmBox = useMemo(() => {
    return (
      <Box sx={{ p: 2 }}>
        <Box sx={{ mb: 5 }}>
          <Intl langKey='GENERAL.CONFIRM_ACTION' variant='h6' color='secondary' />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant='contained'
            color='secondary'
            size='large'
            onClick={() => setShowRender('renderOptionList')}
          >
            <Intl langKey='GENERAL.BACK' />
          </Button>

          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={handleConfirmClick}
          >
            <Intl langKey='GENERAL.CONFIRM' />
          </Button>
        </Box>
      </Box>
    )
  }, [handleConfirmClick])

  const renderItemComponent = React.useMemo(() => {
    if (selectedOption === '') return null

    const { Component } = options[selectedOption]

    if (Component === undefined) return undefined

    return <Component item={selectedItem} onClose={onClose} />
  }, [options, selectedItem, selectedOption, onClose])

  const renderContent = useMemo(() => {
    switch (showRender) {
      case 'renderConfirmBox':
        return renderConfirmBox
      case 'renderItemComponent':
        return renderItemComponent
      default:
        return renderOptionsList
    }
  }, [showRender, renderConfirmBox, renderItemComponent, renderOptionsList])

  return (
    <Dialog
      aria-labelledby='product-dialog'
      fullWidth
      fullScreen={dialogFullScreen}
      onClose={onClose}
      open
    >
      <DialogTitle id='default-dialog-title'>
        {title}
        <IconButton sx={sxCloseDialogButton} aria-label='close' onClick={onClose}>
          <CloseIcon fontSize='small' />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {renderContent}
      </DialogContent>
    </Dialog>

  )
}

export default React.memo(DefaultDialogComponent)
