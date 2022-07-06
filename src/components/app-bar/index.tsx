// Libraries
import React, { useState, useCallback } from 'react'

// Material Components
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// Icons
import MenuIcon from '@mui/icons-material/Menu'

// Shared
import { useAppContext } from '../../hoc'
import { Link } from '../link'

// Components
import Menu from './menu'

// Styles
import { sxAppBar, sxLinkHome } from './sx'

// Icon
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const icon = require('../../assets/logo-icon.png').default
// import {OverridableComponent} from "@mui/material/OverridableComponent";
// import {SvgIconTypeMap} from "@mui/material";

// Interfaces
// import { MainAppHookProps } from '../../hoc/appRoutes'

interface ButtonAppBarProps {
  mainAppHook: any
  logo: any
}

const ButtonAppBar: React.FC<ButtonAppBarProps> = ({ mainAppHook, logo }) => {
  const { pageTitle } = useAppContext()
  const { menuItems } = mainAppHook()
  const [isMenuOpen, setOpenMenu] = useState(false)

  const handleClick = useCallback(() => setOpenMenu(!isMenuOpen), [isMenuOpen])

  return (
    <>
      <AppBar sx={sxAppBar} position='fixed'>
        <Toolbar>
          <Link sx={sxLinkHome} to='/'>
            <img src={logo} alt='logo' />
          </Link>

          <Typography sx={{ flexGrow: 1 }} color='secondary' variant='h6'>
            {pageTitle}
          </Typography>

          <IconButton className='menu-icon-button' aria-label='menu' edge='end' onClick={handleClick}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu menuItems={menuItems} onCloseMenu={() => setOpenMenu(false)} isMenuOpen={isMenuOpen} />
    </>
  )
}

export default React.memo(ButtonAppBar)
