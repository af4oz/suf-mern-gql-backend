import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { IoMdMenu as MenuIcon } from 'react-icons/io'
import { MdClear as CloseIcon } from 'react-icons/md'
import { GoGlobe as PublicIcon } from 'react-icons/go'
import { MdLocalOffer as LocalOfferIcon } from 'react-icons/md'
import { MdPeopleAlt as PeopleIcon } from 'react-icons/md'
import MenuItem from '../my-mui/Menu/Item'
import IconButton from '../my-mui/IconButton'
import Menu from '../my-mui/Menu'

import 'twin.macro'

const MobileNavMenu = () => {
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(undefined)
  }

  return (
    <div>
      <IconButton tag="button" tw="font-size[1.5em]" onClick={handleOpenMenu}>
        {!anchorEl ? <MenuIcon /> : <CloseIcon />}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          tag="a"
          selected={
            pathname === '/' ||
            (!pathname.startsWith('/tag') && !pathname.startsWith('/user'))
          }
          href="/"
          onClick={handleCloseMenu}
        >
          <PublicIcon tw="mr-2" />
          Stack Underflow
        </MenuItem>
        <MenuItem
          tag="a"
          selected={pathname.startsWith('/tag')}
          href="/tags"
          onClick={handleCloseMenu}
        >
          <LocalOfferIcon tw="mr-2" />
          Tags
        </MenuItem>
        <MenuItem
          tag="a"
          selected={pathname.startsWith('/user')}
          href="/users"
          onClick={handleCloseMenu}
        >
          <PeopleIcon tw="mr-2" />
          Users
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MobileNavMenu
