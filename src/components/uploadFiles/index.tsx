import React, { useCallback, useRef, useMemo, useEffect } from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import IconButton from '@mui/material/IconButton'
import Alert from '@mui/material/Alert'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import CloudIcon from '@mui/icons-material/Cloud'

import { Intl, onlyText } from '../../utils/intl'
import { Loading } from '../loading'

import { useAppContext } from '../../hoc/hooks'
import { useHandleFiles, EntityProp, EntityIdProp, FileProps } from './hooks'

import FileRow from './fileRow'

import { ACCEPTED_FILE_TYPES, IMAGE_TYPES, DOCUMENT_TYPES } from './constants'

interface SharedUploadFilesProps {
  accept?: string,
  multiple?: boolean,
  maxSize?: number,
  entity: EntityProp,
  entityId?: EntityIdProp,
  targetId?: string,
  type?: keyof typeof ACCEPTED_FILE_TYPES,
  onLoad: (files: FileProps[]) => void,
}

export const SharedUploadFiles = ({
  multiple = false,
  maxSize = 5 * 1024 * 1024,
  entity,
  entityId,
  targetId = '',
  type = ACCEPTED_FILE_TYPES.IMAGES as keyof typeof ACCEPTED_FILE_TYPES,
  onLoad
}: SharedUploadFilesProps) => {
  const idRef = useRef<string>('')
  if (!idRef.current) {
    idRef.current = `upload-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`
  }
  const id = idRef.current

  const { setSnackBarMessage } = useAppContext()

  const { files, isLoading, error, postFiles, removeFile } = useHandleFiles({ entity, entityId })

  const { accept, langKey } = useMemo(() => {
    let accept = ''
    let langKey = ''

    switch (type) {
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
  }, [type, multiple])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

    postFiles(Array.from(files))
  }, [postFiles, maxSize, setSnackBarMessage])

  useEffect(() => {
    if (files) {
      onLoad(files)
    }
  }, [files, onLoad])

  if (error) {
    return (
      <Alert severity="error">
        {error.message || 'An error occurred while loading files.'}
      </Alert>
    )
  }

  const uploadDisabled = isLoading || (!multiple && !!files?.length)

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
            onChange={handleChange}
            disabled={uploadDisabled}
          />
          <label htmlFor={`button-file-${id}`}>
            <IconButton color="primary" component="span" size="small" disabled={uploadDisabled}>
              <CloudUploadIcon />
            </IconButton>
          </label>
        </Box>
        <IconButton color="secondary" component="span" size="small" disabled={isLoading} >
          <CloudIcon />
        </IconButton>
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

      {isLoading && <Loading />}

      <List>
        {files?.map(file => (
          <FileRow
            key={file.id}
            file={file}
            handleRemoveFile={() => removeFile(file.id)}
          />
        ))}
      </List>
    </Box>
  )
}
