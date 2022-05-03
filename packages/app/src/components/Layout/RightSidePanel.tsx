import tw from 'twin.macro'
import { useAppContext } from '~~/context/state'
import { useFetchAllTagsQuery } from '~~/generated/graphql'
import { getErrorMsg } from '~~/utils/helperFuncs'
import LoadingSpinner from '../LoadingSpinner'
import Tag, { Tags } from '../Tag'

const Grid = tw.div`m-0 w-1/3 mt-4 rounded-sm hidden md:block`

const Heading = tw.h3`text-purple-900 text-center mb-4`

const RightSidePanel = () => {
  const { notify } = useAppContext()

  const { data, loading } = useFetchAllTagsQuery({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  return (
    <Grid>
      {!loading && data && (
        <>
          <div tw="hidden md:block min-height[35vh] p-2 bg-yellow-200 rounded-sm border-purple-600">
            <Heading>Top Tags</Heading>
            <Tags col>
              {data.getAllTags.slice(0, 26).map((t) => (
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
          </div>
        </>
      )}
      {loading && <LoadingSpinner size="large" />}
    </Grid>
  )
}

export default RightSidePanel
