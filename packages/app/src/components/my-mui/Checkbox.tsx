import tw from 'twin.macro'
import { ComponentProps, ReactNode } from 'react'

interface CheckboxProps extends ComponentProps<'button'> {
  checkedIcon: ReactNode
  checked: boolean
  icon: ReactNode
}
const Checkbox = ({
  checkedIcon,
  checked,
  icon,
  onClick,
  ...otherProps
}: CheckboxProps) => {
  return (
    <button
      css={[
        tw`padding[9px] bg-transparent border-none text-decoration[none] user-select[none] items-center justify-center vertical-align[middle] border-radius[50%] hover:bg-gray-200  focus:bg-gray-200 cursor-pointer outline-none transition-colors `,
      ]}
      onClick={onClick}
      {...otherProps}
    >
      {checked ? checkedIcon : icon}
    </button>
  )
}

export default Checkbox
