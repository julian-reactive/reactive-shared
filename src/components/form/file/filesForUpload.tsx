import Box from '@mui/system/Box'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'

import CloseIcon from '@mui/icons-material/Close'

import FileAvatar from './avatar'
import { FileProp } from './sharedTypes'
interface FilesForUploadProps {
  files: (File | FileProp)[] 
  onRemoveFile: (idx: number) => void
}

const FilesForUpload = ({ files, onRemoveFile }: FilesForUploadProps) => {
  return files.map((file, index) => (
    <ListItem sx={{ display: 'flex', alignItems: 'center' }} key={index}>
      <Box mr={1}>
          <FileAvatar file={file} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
        {file.name}
      </Box>
      <IconButton aria-label="close" sx={{ color: (theme) => theme.palette.grey[500] }} onClick={() => onRemoveFile(index)}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  )
  )
}

export default FilesForUpload