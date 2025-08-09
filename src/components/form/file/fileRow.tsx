
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import Box from '@mui/system/Box'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'

import CloseIcon from '@mui/icons-material/Close'

import { api } from '../../../utils/api'

import { Loading } from '../../loading'

import { FileProps } from '../../uploadFiles/hooks'

import { isImageType, isDocumentType } from '../../uploadFiles/constants'

const fetchImageBlob = async (fileId: string): Promise<string> => {
  const response = await api.get(`files/file/${fileId}`, {
    responseType: 'blob'
  })
  return URL.createObjectURL(response)
}

interface FileRowProps {
  file: File
  handleRemoveFile: () => void
}

const FileRow = ({ file, handleRemoveFile }: FileRowProps) => {
  const { data: imageUrl, isLoading } = useQuery({
    queryKey: [file.type, file.id],
    queryFn: () => fetchImageBlob(file.id),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: isImageType(file.content_type)
  })

  const handleDownloadFile = () => {
    const link = document.createElement('a')
    // link.href = URL.createObjectURL(file.id)
    // link.download = file.name
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }

  const text = useMemo(() => {
    if (isImageType(file.content_type)) {
      return (
        <>
          <Typography variant="caption" color="primary">{file.name}</Typography>
          <Typography variant="caption">{`${(file.size / 1024).toFixed(2)} Kb`}</Typography>
        </>
      )
    }
    if (isDocumentType(file.content_type)) {
      return (
        <Button onClick={handleDownloadFile}>
          <Typography variant="caption" color="primary">{file.name}</Typography>
          <Typography variant="caption">{`${(file.size / 1024).toFixed(2)} Kb`}</Typography>
        </Button>
      )
    }
    return '-----'
  }, [file.content_type])

  if (isLoading) {
    return (
      <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40 }}>
          <Loading backdrop={false} />
        </Box>
      </ListItem>
    )
  }

  return (
    <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
      <Box mr={1}>
        <Avatar src={imageUrl} alt={file.name} variant="square" />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        {text}
      </Box>
      <IconButton aria-label="close" sx={{ color: (theme) => theme.palette.grey[500] }} onClick={() => handleRemoveFile()}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  )
}

export default FileRow
