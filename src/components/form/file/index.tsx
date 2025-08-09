import React, { useCallback, useRef, useMemo, useEffect } from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloudIcon from '@mui/icons-material/Cloud'

import { Intl, onlyText } from '../../../utils/intl'
import { Loading } from '../../loading'

import { useAppContext } from '../../../hoc/hooks'

import FilesForUpload from './filesForUpload'

import { ACCEPTED_FILE_TYPES, IMAGE_TYPES, DOCUMENT_TYPES } from '../../uploadFiles/constants'

import { BuildInputProps } from '../sharedTypes'



 const SharedUploadFiles = ({
  renderProps: {
    field: {
      onChange: onChangeField
    }
  },
  inputProps: {
    multiple = false,
    maxSize = 5 * 1024 * 1024,
    fileType = ACCEPTED_FILE_TYPES.IMAGES as keyof typeof ACCEPTED_FILE_TYPES,
  }
}: BuildInputProps ) => {

  const idRef = useRef<string>('')
  if (!idRef.current) {
    idRef.current = `upload-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`
  }
  const id = idRef.current

  const [files, setFiles] = React.useState<File[]>([])

  const { setSnackBarMessage } = useAppContext()

  const { accept, langKey } = useMemo(() => {
    let accept = ''
    let langKey = ''

    switch (fileType) {
      case ACCEPTED_FILE_TYPES.IMAGES:
        accept = Object.values(IMAGE_TYPES).join(',')
        langKey = 'FILE.LABEL.IMAGE' + (multiple ? 'S' : '')
        break
      case ACCEPTED_FILE_TYPES.DOCUMENTS:
        accept = Object.values(DOCUMENT_TYPES).join(',')
        langKey = 'FILE.LABEL.DOCUMENT' + (multiple ? 'S' : '')
        break
      case ACCEPTED_FILE_TYPES.ALL:
        accept = Object.values(DOCUMENT_TYPES).join(',') + ',' + Object.values(IMAGE_TYPES).join(',')
        langKey = 'FILE.LABEL.FILE' + (multiple ? 'S' : '')
        break
    }
    return { accept, langKey }
  }, [fileType, multiple])

  const handleSetFiles = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).every(file => {
      if (file.size > maxSize) {
        setSnackBarMessage({
          message: onlyText('FORM.ERROR.FILE_SIZE', { size: maxSize / 1024 / 1024 }),
          severity: 'error'
        })
        return false
      }
      if (!accept.split(',').some(type => file.type === type || file.name.endsWith(type))) {
        setSnackBarMessage({
          message: onlyText('FORM.ERROR.FILE_TYPE'),
          severity: 'error'
        })
        return false
      }
      return true
    })

    setFiles(prevFiles => ([ ...prevFiles, ...Array.from(files) ]))
  }, [maxSize, setSnackBarMessage])

  const handleRemoveFile = useCallback((idx: number) => {
    setFiles(prevFiles => prevFiles.filter((_, index) => index !== idx))
  }, [])

  useEffect(() => {
    if (typeof onChangeField === 'function') {
      onChangeField(files)
    }
  }, [files])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box display="flex" alignItems='center'>
        <Intl langKey={langKey} variant="h6" color="primary" mr={2} sx={{ fontStyle: 'italic' }} />
        <Box mr={2}>
          <input
            accept={accept}
            multiple={multiple}
            style={{ display: 'none' }}
            id={`button-file-${id}`}
            type="file"
            onChange={handleSetFiles}
          />
          <label htmlFor={`button-file-${id}`}>
            <IconButton color="primary" component="span" size="small" >
              <CloudUploadIcon />
            </IconButton>
          </label>
        </Box>
        <Intl
          ml={2}
          langKey="FILE.LABEL.MAX_SIZE"
          variant="body2"
          fontSize="10px"
          color="textSecondary"
          fontStyle='italic'
          replace={{ size: (maxSize / 1024 / 1024).toFixed(0) }}
        />
      </Box>
      {!!files?.length && (
        <>
        <Intl langKey='FORM.LABEL.FILES_FOR_UPLOAD' variant="caption" color="textSecondary" sx={{ fontStyle: 'italic', mt: 1 }} />
        <FilesForUpload files={files} onRemoveFile={handleRemoveFile} />
        </>
      )}
    </Box>
  )
}

export default SharedUploadFiles
