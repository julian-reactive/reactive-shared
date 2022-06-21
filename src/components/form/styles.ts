export const sxTextField = ({
  paper: {
    padding: 2
  },
  textField: {
    marginBottom: 2,
    '& label': {
      marginLeft: 3,
      textTransform: 'capitalize'
    }
  }
})

export const sxSelect = ({
  select: {
    // position: 'relative',
    width: '100%',
    marginBottom: 2,
    '& .MuiInputLabel-filled': {
      marginLeft: 3
    },
    '& .MuiSelect-root.MuiSelect-select': {
      marginLeft: 4
    },
    '& .MuiSelect-select em': {
      fontSize: '14px'
    },
    '& .MuiFormLabel-root.MuiInputLabel-root': {
      marginLeft: 3
    },
    '& .MuiFilledInput-input': {
      fontSize: '14px',
      marginLeft: 4,
      padding: '20px 12px 10px'
    }
  }
})

export const sxIcon = {
  // position: 'absolute',
  zIndex: 3
  // top: '20px'
}

export const sxDatePicker = ({
  root: {
    position: 'relative',
    '& .MuiInputLabel-root': {
      marginLeft: 3,
      position: 'absolute'
    }
  },
  icon: {
    position: 'absolute',
    zIndex: 3,
    top: '19px',
    '&:before': {
      left: 0,
      right: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: 'absolute',
      transition: ' border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
      pointerEvents: 'none'
    }
  },
  dateInputs: {
    marginTop: 2,
    marginLeft: 3,
    display: 'flex',
    '& .MuiInput-root': {
      marginRight: 2
    }
  },
  dateYear: {
    '& input': {
      paddingLeft: '4px'
    }
  }
})
