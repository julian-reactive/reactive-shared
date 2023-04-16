// Libraries
import React, { useState, useCallback } from 'react'

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
}

const AmountComponent: React.FC<AmountComponentProps> = ({ onPlus, onMinus, maxValue = Number.MAX_SAFE_INTEGER, minValue = 0, initialValue = 0 }) => {
  const [amount, setAmount] = useState(initialValue)

  const handlePlus = useCallback(() => {
    setAmount(value => {
      if (value < maxValue) {
        value = value + 1
        onPlus(value)
      }
      return value
    })
  }, [onPlus, maxValue])

  const handleMinus = useCallback(() => {
    setAmount(value => {
      if (amount > minValue) {
        value = value - 1
        onMinus(value)
      }
      return value
    })
  }, [onMinus, amount, minValue])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
      <Fab
        aria-label='remove 1 unit amount'
        color='secondary'
        onClick={handleMinus}
        size='small'
      >
        <RemoveIcon fontSize='small' />
      </Fab>

      <TextField
        sx={{ px: 1, width: '40%' }}
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
      >
        <AddIcon fontSize='small' />
      </Fab>
    </Box>
  )
}

export const SharedAmount = React.memo(AmountComponent)
