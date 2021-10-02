import React from 'react'
import tw, { styled, css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Link as RouterLink } from 'react-router-dom';

const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none] font-size[32px]`

const LightButton = props => (
  <button
    tw="cursor-pointer text-gray-600 bg-transparent border-0 rounded-sm text-xs"
    tabIndex={0}
    {...props}
  />
)

const Button = tw.button`no-underline px-1 py-2 sm:(px-4 py-2) bg-blue-600  text-white text-xs rounded-sm leading-none whitespace-nowrap inline-block border-none cursor-pointer transition-colors`

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

const TextField = React.forwardRef((props, ref) => {
  const { InputProps, ...rest } = props;
  const [focus, setFocus] = React.useState(false);

  const borderStyles = [
    tw` text-left absolute top[-5px] left-0 right-0 bottom-0 m-0 py-0 px-2 pointer-events-none overflow-hidden min-w-0 rounded-sm border-width[1px] border-gray-400 border-solid  hover:border-gray-800`,
    focus && tw`border-2 border-purple-600`
  ]

  return (
    <div tw="relative inline-flex mt-4">
      {
        InputProps.startAdornment ? (
          <div tw="mr-1 inline-flex justify-center items-center pl-2">
            {InputProps.startAdornment}
          </div>
        ) : null
      }
      <input type="text" ref={ref} {...rest} tw="border-none outline-none font[inherit] color[currentColor] py-2 " onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
      <fieldset aria-hidden="true" css={borderStyles}>
        <legend tw="block w-0 p-0 invisible line-height[11px]">
          <span>Required&nbsp;*</span>
        </legend>
      </fieldset>
      {
        InputProps.endAdornment ? (
          <div tw="ml-1 inline-flex justify-center items-center pr-2">
            {InputProps.endAdornment}
          </div>
        ) : null
      }
    </div>
  )
})

const ChipLink = (props) => {
  const { label, to, ...rest } = props

  return (
    <RouterLink to={to} {...rest} tw="no-underline">
      <span tw="bg-purple-200 opacity-75 border-solid border-width[1px] border-purple-800 rounded-sm padding[.1rem .5rem] text-xs no-underline text-purple-900" >
        {label}
      </span>
    </RouterLink>
  )
}
const Avatar = (props) => {
  const { src, alt, to, ...rest } = props
  return (
    <RouterLink to={to} tw="w-10 h-10 rounded-sm mr-2" {...rest}>
      <img src={src} alt={alt} tw="text-transparent w-full h-full object-cover text-center "></img>
    </RouterLink>
  )
}
const Link = styled(RouterLink)`
  text-decoration: none;
  ${tw`text-purple-900 hover:text-purple-600`}
`;

const EmptyLink = styled.a`
  text-decoration: none;
  ${tw`text-purple-900 hover:text-purple-600`}
`;
const Divider = tw.hr`my-0 border-width[1px] border-b-0 border-t-gray-lightest border-opacity-50 `;

// const TextField = 

export { IconButton, SvgIcon, LightButton, Button, Checkbox, TextArea, TextField, ChipLink, Avatar, Link, Divider, EmptyLink };
