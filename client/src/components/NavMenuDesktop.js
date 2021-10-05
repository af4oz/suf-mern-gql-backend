import { useLocation } from 'react-router-dom'

import PublicIcon from '@material-ui/icons/Public'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import PeopleIcon from '@material-ui/icons/People'

import tw, { styled, css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Divider, MenuItem } from './CompStore'

const DesktopNavMenu = () => {
  const { pathname } = useLocation()
  const iconStyles = css`
    ${tw`width[.8em] height[.8em] mr-2`}
  `

  return (
    <div tw="hidden sm:block" >
      <div tw="sticky flex min-height[95vh] top[5vh]">
        <div tw="flex flex-col mt-4">
          <MenuItem
            selected={
              pathname === '/' ||
              (!pathname.startsWith('/tag') && !pathname.startsWith('/user'))
            }
            to="/"
          >
            <PublicIcon css={iconStyles} />
            Stack Underflow
          </MenuItem>
          <MenuItem
            selected={pathname.startsWith('/tag')}
            to="/tags"
          >
            <LocalOfferIcon css={iconStyles} />
            Tags
          </MenuItem>
          <MenuItem
            selected={pathname.startsWith('/user')}
            to="/users"
          >
            <PeopleIcon css={iconStyles} />
            Users
          </MenuItem>
        </div>
        <Divider orientation="vertical" />
      </div>
    </div>
  )
}

export default DesktopNavMenu
