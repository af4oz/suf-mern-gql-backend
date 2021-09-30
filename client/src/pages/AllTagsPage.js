import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_ALL_TAGS } from '../graphql/queries'
import LoadingSpinner from '../components/LoadingSpinner'
import { useStateContext } from '../context/state'
import { getErrorMsg } from '../utils/helperFuncs'

import { TextField ,ChipLink} from '../components/CompStore'
import SearchIcon from '@material-ui/icons/Search'
import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const AllTagsPage = () => {
  const { notify } = useStateContext()
  const { data, loading } = useQuery(GET_ALL_TAGS, {
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const [filterInput, setFilterInput] = useState('')

  return (
    <div tw="p-3 mt-2">
      <h2 tw="mt-0 text-purple-900  font-normal">
        Tags
      </h2>
      <p tw="leading-5 text-gray-700">
        A tag is a keyword or label that categorizes your question with other,
        similar questions. Using <br />
        the right tags makes it easier for others to find and answer your
        question.
      </p>
      <TextField
        value={filterInput}
        placeholder="Filter by tag name"
        onChange={e => setFilterInput(e.target.value)}
        variant="outlined"
        size="small"
        InputProps={{
          startAdornment: (
              <SearchIcon color="primary" />
          ),
        }}
      />
      {!loading && data ? (
        <div tw="flex mt-4">
          {data.getAllTags
            .filter(t =>
              t.tagName.toLowerCase().includes(filterInput.toLowerCase())
            )
            .map((t,i) => (
              <div key={t.tagName} css={ [i !== 0 && tw`ml-2`,tw`border-gray-400 border-width[1px] border-solid rounded-sm p-2 min-width[8em]`] }>
                <ChipLink
                  label={t.tagName}
                  tw="mb-2"
                  to={`/tags/${t.tagName}`}
                />
                <div tw="mt-2">
                  <span tw="text-xs text-purple-800">
                  {t.count} questions
                  </span>
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

export default AllTagsPage
