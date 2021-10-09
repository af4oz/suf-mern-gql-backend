import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import { IoMdMenu as MenuIcon } from 'react-icons/io';
import { MdClear as CloseIcon } from 'react-icons/md';
import { GoGlobe as PublicIcon } from 'react-icons/go'
import { MdLocalOffer as LocalOfferIcon } from 'react-icons/md';
import { MdPeopleAlt as PeopleIcon } from 'react-icons/md';
import { MenuItem, IconButton, Menu } from './CompStore';

import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const MobileNavMenu = () => {
  const { pathname } = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <div >
      <IconButton tw="font-size[1.5em]" onClick={handleOpenMenu}>
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
          selected={
            pathname === '/' ||
            (!pathname.startsWith('/tag') && !pathname.startsWith('/user'))
          }
          to="/"
          onClick={handleCloseMenu}
        >
          <PublicIcon tw="mr-2" />
          Stack Underflow
        </MenuItem>
        <MenuItem
          selected={pathname.startsWith('/tag')}
          to="/tags"
          onClick={handleCloseMenu}
        >
          <LocalOfferIcon tw="mr-2" />
          Tags
        </MenuItem>
        <MenuItem
          selected={pathname.startsWith('/user')}
          to="/users"
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
