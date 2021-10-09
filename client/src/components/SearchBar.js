import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { InputAdornment, IconButton, TextField } from './CompStore'

import { MdSearch as SearchIcon } from 'react-icons/md';
import { IoMdArrowBack as ArrowBackIcon } from 'react-icons/io';

import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const SearchBar = ({ setSearchOpen, ...rest }) => {
  const [searchInput, setSearchInput] = useState('')
  const history = useHistory()

  const handleSearch = e => {
    e.preventDefault()
    if (searchInput === '') return
    history.push(`/search/${searchInput}`)
  }

  const clearSearch = () => {
    if (setSearchOpen) {
      setSearchOpen(false)
    }
    setSearchInput('')
  }

  return (
    <div css={[tw`flex-grow[.6]`,]} {...rest}>
      <form onSubmit={handleSearch}>
        <TextField
          type="search"
          placeholder="Search for questions…"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          styles={{
            inputRoot: tw`py-1`
          }}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment tw="font-size[1.5em]">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (searchInput || setSearchOpen) && (
              <InputAdornment >
                <IconButton tw="p-0 font-size[1.5em]" onClick={clearSearch}>
                  <ArrowBackIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  )
}

export default SearchBar
