import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_USERS } from '../graphql/queries'
import LoadingSpinner from '../components/LoadingSpinner'
import { useStateContext } from '../context/state'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import SearchIcon from '@material-ui/icons/Search'
import tw from 'twin.macro';
import { TextField, Avatar, Link } from '../components/CompStore'

const AllUsersPage = () => {
  const { notify } = useStateContext()
  const { data, loading } = useQuery(GET_ALL_USERS, {
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [filterInput, setFilterInput] = useState('')

  return (
    <div tw="p-2 w-full">
      <h2 tw="text-purple-900 font-normal">
        Users
      </h2>
      <TextField
        value={filterInput}
        placeholder="Filter by username"
        onChange={e => setFilterInput(e.target.value)}
        InputProps={{
          startAdornment: (
            <SearchIcon tw="text-purple-600" />
          ),
        }}
      />
      {!loading && data ? (
        <div tw="flex mt-6">
          {data.getAllUsers
            .filter(u =>
              u.username.toLowerCase().includes(filterInput.toLowerCase())
            )
            .map((u, i) => (
              <div key={u.id} css={[i !== 0 && tw`ml-2`, tw`flex `]}>
                <Avatar
                  src={`https://secure.gravatar.com/avatar/${u.id}?s=164&d=identicon`}
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
          <LoadingSpinner size={80} />
        </div>
      )}
    </div>
  )
}

export default AllUsersPage
