import LoadingSpinner from './LoadingSpinner'
import { MdAutorenew as AutorenewIcon } from 'react-icons/md';
import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { Button } from './CompStore'

interface LoadMoreButtonProps {
  handleLoadPosts: (...args: any) => void;
  loading?: boolean;
}

const LoadMoreButton = ({ handleLoadPosts, loading }: LoadMoreButtonProps) => {

  return (
    <div tw="flex justify-center my-3">
      <Button
        tw="flex items-center justify-center px-6 py-2 w-1/2 bg-white text-blue-600 border[1px solid lightgray] hover:(bg-blue-600 text-white)"
        onClick={handleLoadPosts}
        disabled={loading}
      >
        {
          !loading && <AutorenewIcon />
        }
        {loading && (
          <LoadingSpinner
            size='small'
            styles={{
              loaderIconWrapper: tw`text-white mr-2`
            }}
          />
        )}
        {loading ? 'Loading...' : 'Load More'}
      </Button>
    </div>
  )
}

export default LoadMoreButton
