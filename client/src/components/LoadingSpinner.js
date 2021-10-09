import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { AiOutlineLoading3Quarters as LoadingIcon } from 'react-icons/ai';

const loaderStyles = tw`w-10 h-10 inline-block animate-spin text-center text-purple-700`

const LoadingSpinner = ({ size, styles, ...rest }) => {
  let sizeStyles;
  if (size === 'small') {
    sizeStyles = tw`w-4 h-4`;
  } else if (size === 'medium') {
    sizeStyles = tw`w-6 h-6`;
  } else if (size === 'large') {
    sizeStyles = tw`w-8 h-8`
  } else {
    sizeStyles = tw`w-10 h-10`
  }
  return (
    <div css={[tw`flex justify-center`, styles && styles.loaderRoot]}>
      <span
        css={[loaderStyles, sizeStyles, styles && styles.loaderIconWrapper]}
        {...rest}
      >
        <LoadingIcon tw="w-full h-full" />
      </span>
    </div>
  )
}

export default LoadingSpinner
