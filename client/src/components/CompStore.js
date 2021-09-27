import React from 'react'
import tw from 'twin.macro' // eslint-disable-line no-unused-vars

const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none] font-size[32px]`

const LightButton = props => (
  <button
    tw="cursor-pointer text-gray-600 bg-transparent border-0 rounded-sm text-xs"
    tabIndex={0}
    {...props}
  />
)

const Button = tw.button`no-underline px-1 py-2 sm:(px-4 py-2) bg-blue-600  text-white text-xs rounded-sm leading-none whitespace-nowrap inline-block border-none cursor-pointer`

const Checkbox = ({ checkedIcon, checked, icon, onChange, ...otherProps }) => {
  return (
    <button
      tw="padding[9px] bg-transparent border-none text-decoration[none] user-select[none] items-center justify-center vertical-align[middle] border-radius[50%] hover:bg-gray-200  focus:bg-gray-200 cursor-pointer outline-none transition-colors "
      onClick={onChange}
      {...otherProps}
    >
      {checked ? checkedIcon : icon}
    </button>
  )
}

const IconButton = ({ children, ...otherProps }) => {
  return (
    <button
      tw="padding[9px] bg-transparent border-none text-decoration[none] user-select[none] items-center justify-center vertical-align[middle] border-radius[50%] hover:bg-gray-200  focus:bg-gray-200 cursor-pointer outline-none transition-colors "
      {...otherProps}
    >
      {children}
    </button>
  )
}

const TextArea = React.forwardRef((props, ref) => {
  const { helperText, size, error, fullWidth, ...otherProps } = props

  const styles = [
    tw`font[inherit] p-1 resize-none border[1px solid] border-gray-300 rounded-sm`,
    fullWidth && tw`w-full`,
    size === 'small' ? tw`text-sm` : tw`text-lg`,
    error && tw` border-red-500 focus:(border-red-500 border-2 outline-none)`,
  ]
  return (
    <div>
      <textarea ref={ref} {...otherProps} css={styles}></textarea>
      {error && <p tw="text-xs text-red-500 my-0 mx-1">{helperText}</p>}
    </div>
  )
})

export { IconButton, SvgIcon, LightButton, Button, Checkbox, TextArea }
