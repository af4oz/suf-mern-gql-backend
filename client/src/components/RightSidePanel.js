import { useQuery } from '@apollo/client'
import { GET_ALL_TAGS } from '../graphql/queries'
import LoadingSpinner from './LoadingSpinner'
import { useStateContext } from '../context/state'
import { getErrorMsg } from '../utils/helperFuncs'
import { useMediaQuery } from 'react-responsive'
import tw from 'twin.macro'; //eslint-disable-line no-unused-vars
import Tag, { Tags } from './Tag'

const Grid = tw.div`m-0 w-1/3 mt-4 rounded-sm hidden md:block`

const Heading = tw.h3`text-purple-600 text-center`

const RightSidePanel = () => {
  const { notify } = useStateContext()
  const { data, loading } = useQuery(GET_ALL_TAGS, {
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })
  if (
    !useMediaQuery({
      query: '(min-device-width: 1024px)',
    })
  ) {
    return null
  }

  return (
    <Grid>
      <div tw="h-1/3 p-2 bg-purple-200 rounded-sm border-purple-600">
        <Heading>Top Tags</Heading>
        {!loading && data ? (
          <Tags col>
            {data.getAllTags.slice(0, 26).map(t => (
              <Tag
                label={
                  t.tagName.length > 13
                    ? t.tagName.slice(0, 13) + '...'
                    : t.tagName
                }
                key={t.tagName}
                to={`/tags/${t.tagName}`}
                count={t.count}
              />
            ))}
          </Tags>
        ) : (
          <div style={{ minWidth: '200px' }}>
            <LoadingSpinner size={40} />
          </div>
        )}
      </div>
    </Grid>
  )
}

export default RightSidePanel
