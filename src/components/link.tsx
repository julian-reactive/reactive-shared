// Libraries
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Material Components
import MaterialLink, { LinkProps } from '@mui/material/Link'

const LinkContainer: React.FC<LinkProps & { to: string }> = ({ to, ...props }) => {
  return <MaterialLink component={RouterLink} to={to} {...props} />
}

export const Link = React.memo(LinkContainer)
