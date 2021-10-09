import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import NavMenuMobile from './NavMenuMobile'
import UserMenuMobile from './UserMenuMobile'
import UserMenuDesktop from './UserMenuDesktop'
import SearchBar from './SearchBar'
import { useAuthContext } from '../context/auth'
import SofLogo from '../svg/stack-overflow.svg'

import { MdSearch as SearchIcon } from 'react-icons/md';

import { IconButton } from './CompStore';
import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars

const AppBar = styled.div(() => [
  tw`w-full flex flex-col flex-shrink-0 z-index[1100] box-border sticky top-0 left-auto right-0 color[inherit] border-solid border-t-4 border-t-pink-500 shadow-sm border-b-[1px] border-b-gray-500 bg-white`
])
const ToolBar = styled.div(() => [
  tw`flex items-center relative px-0 md:px-6 min-height[48px] `
])
const Container = styled.div(() => [
  tw`w-full flex items-center mx-auto xl:max-width[1280px]`
])
const MdScreenTopLeft = styled.div(() => [
  tw`hidden sm:(inline-flex items-center) mr-2`
])
const SmScreenTopLeft = tw.div`sm:hidden mr-4 flex items-center`;

const SmScreenTopRight = tw.div`sm:hidden flex items-center`;

const MdScreenTopRight = tw.div`hidden sm:block`;

const NavBar = () => {
  const { user, logoutUser } = useAuthContext()
  const [searchOpen, setSearchOpen] = useState(false)
  const client = useApolloClient()

  useEffect(() => {
    if (searchOpen) {
      setSearchOpen(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogout = () => {
    logoutUser()
    client.resetStore()
  }

  return (
    <AppBar
    >
      <ToolBar>
        {!searchOpen && (
          <Container>
            <div tw="flex flex-grow-default items-center">
              <SmScreenTopLeft>
                <NavMenuMobile />
                <IconButton
                  to="/"
                  tw="px-2 mb-1"
                >
                  <img src={SofLogo} width="25px" alt="sof-logo" />
                </IconButton>
              </SmScreenTopLeft>
              <MdScreenTopLeft>
                <IconButton
                  to="/"
                  tw="mr-1 flex items-center"
                >
                  <img
                    src={SofLogo}
                    width="28px"
                    alt="sof-logo"
                    style={{ marginRight: '5px' }}
                  />
                  stack<strong>underflow</strong>
                </IconButton>
              </MdScreenTopLeft>
              <SearchBar tw="hidden sm:block " />
            </div>
            <SmScreenTopRight>
              <IconButton
                onClick={() => setSearchOpen(prevState => !prevState)}
                tw="font-size[1.5em]"
              >
                <SearchIcon />
              </IconButton>
              <UserMenuMobile user={user} logoutUser={handleLogout} />
            </SmScreenTopRight>
            <MdScreenTopRight>
              <UserMenuDesktop user={user} logoutUser={handleLogout} />
            </MdScreenTopRight>
          </Container>
        )}
        {searchOpen && (
          <SearchBar setSearchOpen={setSearchOpen} />
        )}
      </ToolBar>
    </AppBar>
  )
}

export default NavBar
