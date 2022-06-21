import { SxProps } from '@mui/system'

export const sxSubHeader: SxProps = {
  paddingTop: 2,
  paddingBottom: 2,
  backgroundColor: 'primary.dark'
}

export const sxAppBar: SxProps = {
  zIndex: 'modal',
  bgcolor: 'background.paper',
  '& .MuiToolbar-root': {
    minHeight: '50px'
  }
}

export const sxLinkHome: SxProps = {
  marginTop: '5px',
  marginRight: 2,
  '& img': {
    width: '26px'
  }
}
