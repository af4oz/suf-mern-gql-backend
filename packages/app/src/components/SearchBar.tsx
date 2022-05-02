import React, { ComponentProps, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { InputAdornment, IconButton, TextField } from './CompStore'

import { MdSearch as SearchIcon } from 'react-icons/md'
import { IoMdArrowBack as ArrowBackIcon } from 'react-icons/io'

import tw from 'twin.macro' // eslint-disable-line no-unused-vars

interface SearchBarProps extends ComponentProps<'div'> {
  setSearchOpen?: (...args: any) => void
}

const SearchBar = ({ setSearchOpen, ...rest }: SearchBarProps) => {
  const [searchInput, setSearchInput] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput === '') return
    navigate(`/search/${searchInput}`)
  }

  const clearSearch = () => {
    if (setSearchOpen) {
      setSearchOpen(false)
    }
    setSearchInput('')
  }

  return (
    <div css={[tw`flex-grow[.6]`]} {...rest}>
      <form onSubmit={handleSearch}>
        <TextField
          tag="input"
          type="search"
          placeholder="Search for questions…"
          value={searchInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          styles={{
            inputRoot: tw`py-1`,
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment tw="font-size[1.5em]">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment:
              searchInput || setSearchOpen ? (
                <InputAdornment>
                  <IconButton
                    tag="button"
                    tw="p-0 font-size[1.5em]"
                    onClick={clearSearch}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      </form>
    </div>
  )
}

export default SearchBar
