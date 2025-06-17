// Libraries
import React, { useState, useCallback, useEffect } from 'react'

// Material components
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import TextField from '@mui/material/TextField'

// Icons
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

// Shared
import { onlyText } from '../utils'

interface AmountComponentProps {
  onPlus: (value: number) => void
  onMinus: (value: number) => void
  maxValue?: number
  minValue?: number
  initialValue?: number
  value?: number
  textWidth?: string
  disabled?: boolean
}

const AmountComponent: React.FC<AmountComponentProps> = ({ disabled = false, onPlus, onMinus, maxValue = Number.MAX_SAFE_INTEGER, minValue = 0, initialValue = 0, value: parentValue, textWidth = '40%' }) => {
  const [amount, setAmount] = useState(initialValue)

  const handlePlus = useCallback(() => {
    if (parentValue !== undefined) {
      if (parentValue < maxValue) {
        onPlus(parentValue + 1)
      }
      return undefined
    }

    setAmount(value => {
      if (value < maxValue) {
        value = value + 1
        onPlus(value)
      }
      return value
    })
  }, [onPlus, maxValue, parentValue])

  const handleMinus = useCallback(() => {
    if (parentValue !== undefined) {
      if (parentValue > minValue) {
        onMinus(parentValue - 1)
      }
      return undefined
    }

    setAmount(value => {
      if (amount > minValue) {
        value = value - 1
        onMinus(value)
      }
      return value
    })
  }, [onMinus, amount, minValue, parentValue])

  useEffect(() => {
    setAmount(initialValue)
  }, [initialValue])

  useEffect(() => {
    if (parentValue !== undefined) {
      setAmount(parentValue)
    }
  }, [parentValue])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
      <Fab
        aria-label='remove 1 unit amount'
        color='secondary'
        onClick={handleMinus}
        size='small'
        disabled={disabled}
      >
        <RemoveIcon fontSize='small' />
      </Fab>

      <TextField
        sx={{ px: 1, width: textWidth }}
        label={onlyText('FORM.LABEL.AMOUNT')}
        variant="outlined"
        value={amount}
        disabled
        size='small'
      />

      <Fab
        aria-label='add 1 unit amount'
        color='primary'
        onClick={handlePlus}
        size='small'
        disabled={disabled}
      >
        <AddIcon fontSize='small' />
      </Fab>
    </Box>
  )
}

export const SharedAmount = AmountComponent
