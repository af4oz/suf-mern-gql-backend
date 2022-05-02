import tw from 'twin.macro' // eslint-disable-line no-unused-vars
import { AiOutlineLoading3Quarters as LoadingIcon } from 'react-icons/ai'
import { ComponentProps } from 'react'

const loaderStyles = tw`w-10 h-10 inline-block animate-spin text-center text-purple-700`

interface LoadingSpinnerProps extends ComponentProps<'span'> {
  size?: 'small' | 'medium' | 'large' | 'x-large'
  styles?: {
    loaderRoot?: any
    loaderIconWrapper?: any
  }
}

const LoadingSpinner = ({ size, styles, ...rest }: LoadingSpinnerProps) => {
  let sizeStyles
  if (size === 'small') {
    sizeStyles = tw`w-4 h-4`
  } else if (size === 'medium') {
    sizeStyles = tw`w-6 h-6`
  } else if (size === 'large') {
    sizeStyles = tw`w-8 h-8`
  } else {
    sizeStyles = tw`w-10 h-10`
  }
  return (
    <div
      css={[tw`flex justify-center w-full h-full`, styles && styles.loaderRoot]}
    >
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
