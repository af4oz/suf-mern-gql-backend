import React, { useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAppContext } from '../context/state'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import { MdSearch as SearchIcon } from 'react-icons/md';
import tw from 'twin.macro';
import { TextField, Avatar, Link, InputAdornment } from '../components/CompStore'
import { useFetchAllUsersQuery } from '../generated/graphql'

const AllUsersPage = () => {
  const { notify } = useAppContext()
  const { data, loading } = useFetchAllUsersQuery({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [filterInput, setFilterInput] = useState('')

  return (
    <div tw="p-2 w-full">
      <h2 tw="text-xl my-2 text-purple-900 font-normal">
        Users
      </h2>
      <TextField
        tag="input"
        value={filterInput}
        placeholder="Filter by username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment tw="text-purple-600 font-size[1.5em]">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {!loading && data ? (
        <div tw="flex mt-6 flex-wrap">
          {data.getAllUsers
            .filter(u =>
              u.username.toLowerCase().includes(filterInput.toLowerCase())
            )
            .map((u) => (
              <div key={u._id} css={[tw`flex m-1`]}>
                <Avatar
                  src={`https://secure.gravatar.com/avatar/${u._id}?s=164&d=identicon`}
                  alt={u.username}
                  to={`/user/${u.username}`}
                />
                <div>
                  <Link to={`/user/${u.username}`}>
                    <span tw="text-sm">{u.username}</span>
                  </Link>
                  <p tw="text-xs my-0">
                    created {formatDateAgo(u.createdAt)} ago
                  </p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div style={{ minWidth: '100%' }}>
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default AllUsersPage
