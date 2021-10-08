import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import AuthFormModal from './AuthFormModal'

import { Menu, MenuItem, Avatar, EmptyLink } from './CompStore'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const UserMenuDesktop = ({ user, logoutUser }) => {
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
        <div style={{ display: 'inline' }}>
          <EmptyLink
            tw="text-sm flex items-center justify-center"
            onClick={handleOpenMenu}
          >
            <Avatar
              alt={user.username}
              src={`https://secure.gravatar.com/avatar/${user.id}?s=164&d=identicon`}
              styles={
                {
                  avatarRoot: tw`width[1.5em] height[1.5em]`
                }
              }
            />
            <span tw="text-purple-900">
              {user.username}
            </span>
            <KeyboardArrowDownIcon />
          </EmptyLink>
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
            <MenuItem
              component={RouterLink}
              to={`/user/${user.username}`}
              onClick={handleCloseMenu}
            >
              <AccountCircleIcon tw="mr-2" />
              My Profile
            </MenuItem>
            <MenuItem to="#" onClick={handleLogoutClick}>
              <PowerSettingsNewIcon tw="mr-2" />
              Logout
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <AuthFormModal />
      )}
    </div>
  )
}

export default UserMenuDesktop
