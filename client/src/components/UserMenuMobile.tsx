import { useState } from 'react'
import AuthFormModal from './AuthFormModal'

import { IoMdMore as MoreVertIcon } from 'react-icons/io';
import { MdAccountCircle as AccountCircleIcon } from 'react-icons/md';
import { IoMdPower as PowerIcon } from 'react-icons/io';

import { Menu, MenuItem, IconButton, SvgIcon, Avatar } from './CompStore';

import 'twin.macro';
import { Author } from '../generated/graphql';

interface MobileUserMenuProps {
  user?: Author;
  logoutUser: (...args: any) => void;
}

const MobileUserMenu = ({ user, logoutUser }: MobileUserMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>(undefined)

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(undefined)
  }

  const handleLogoutClick = () => {
    logoutUser()
    handleCloseMenu()
  }

  return (
    <div>
      <IconButton tag="button" onClick={handleOpenMenu} tw="font-size[1.5em]" >
        {
          user ? (
            <Avatar
              to={`/user/${user.username}`}
              alt={user.username}
              src={`https://secure.gravatar.com/avatar/${user._id}?s=164&d=identicon`}
              tw="width[1.2em] height[1.2em] font-size[.8em]"
            />
          ) : null
        }
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        {user ? (
          <div>
            <MenuItem
              tag="a"
              href={`/user/${user.username}`}
              onClick={handleCloseMenu}
            >
              <SvgIcon tw="mr-2">
                <AccountCircleIcon />
              </SvgIcon>
              My Profile
            </MenuItem>
            <MenuItem tag="div" onClick={handleLogoutClick}>
              <SvgIcon tw="mr-2">
                <PowerIcon />
              </SvgIcon>
              Logout: {user.username}
            </MenuItem>
          </div>
        ) : (
          <AuthFormModal buttonType="mobile" closeMenu={handleCloseMenu} />
        )}
      </Menu>
    </div>
  )
}

export default MobileUserMenu
