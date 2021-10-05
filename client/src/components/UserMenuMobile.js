import { useState } from 'react'
import AuthFormModal from './AuthFormModal'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import { Menu, MenuItem, IconButton, Avatar } from './CompStore';

import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const MobileUserMenu = ({ user, logoutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogoutClick = () => {
    logoutUser()
    handleCloseMenu()
  }

  return (
    <div>
      {user ? (
        <IconButton onClick={handleOpenMenu} >
          <Avatar
            alt={user.username}
            src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`}
            tw="width[1.2em] height[1.2em]"
          />
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleOpenMenu}
          color="primary"
        >
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
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
              to={`/user/${user.username}`}
              onClick={handleCloseMenu}
            >
              <AccountCircleIcon tw="mr-2" />
              My Profile
            </MenuItem>
            <MenuItem to="#" onClick={handleLogoutClick}>
              <PowerSettingsNewIcon tw="mr-2" />
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
