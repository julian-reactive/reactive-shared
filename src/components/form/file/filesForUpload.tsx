
import Box from '@mui/system/Box'
import ListItem from '@mui/material/ListItem'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { isImageType } from '../../uploadFiles/constants'
import { useMemo } from 'react'

interface FilesForUploadProps {
  files: File[]
  onRemoveFile: (idx: number) => void
}

const FilesForUpload = ({ files, onRemoveFile }: FilesForUploadProps) => {
  const listFiles = useMemo(() => {
    return files.map(file => {
      const isImage = isImageType(file.type)

      let text = file.name
      let imageUrl = ''

      if (isImage) {
        imageUrl = URL.createObjectURL(file)
      }

      return { text, imageUrl }
    })
  }, [files])

  return listFiles.map(({ text, imageUrl }, index) => (
    <ListItem sx={{ display: 'flex', alignItems: 'center' }} key={index}>
      <Box mr={1}>
        {imageUrl ? (<Avatar src={imageUrl} alt={text} variant="square" />) : (
          <Avatar>
            <InsertDriveFileIcon />
          </Avatar>
        )}

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        {text}
      </Box>
      <IconButton aria-label="close" sx={{ color: (theme) => theme.palette.grey[500] }} onClick={() => onRemoveFile(index)}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  )
  )
}

export default FilesForUpload