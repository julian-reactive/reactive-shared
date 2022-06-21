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
  maxValue: number
}

const AmountComponent: React.FC<AmountComponentProps> = ({ onPlus, onMinus, maxValue }) => {
  const [amount, setAmount] = useState(1)

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
      if (amount > 1) {
        value = value - 1
        onMinus(value)
      }
      return value
    })
  }, [amount, onMinus])

  return (
    <Box sx={{ my: 2, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
      <Fab
        aria-label='remove 1 unit amount'
        color='secondary'
        onClick={handleMinus}
        size='small'
      >
        <RemoveIcon fontSize='small' />
      </Fab>

      <Box sx={{ px: 1, width: '30%' }}>
        <TextField
          label={onlyText('FORM.LABEL.AMOUNT')}
          variant='outlined'
          value={amount}
          disabled
          size='small'
        />
      </Box>

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
