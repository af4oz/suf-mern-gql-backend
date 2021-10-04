import { CircularProgress } from '@material-ui/core'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Button } from './CompStore'

const LoadMoreButton = ({ handleLoadPosts, loading }) => {

  return (
    <div tw="flex justify-center my-3">
      <Button
        tw="px-6 py-1 w-1/2 bg-white text-blue-600 border[1px solid lightgray] hover:(bg-blue-600 text-white)"
        onClick={handleLoadPosts}
        disabled={loading}
      >
        {
          !loading && <AutorenewIcon />
        }
        {loading && (
          <CircularProgress
            disableShrink
            size={22}
            style={{ marginRight: '1em' }}
          />
        )}
        {loading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  )
}

export default LoadMoreButton
