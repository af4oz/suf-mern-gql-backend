import React from 'react'
import ReactDOM from "react-dom";
import tw, { styled, css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import useModal from '../hooks/useModal';

const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none] font-size[32px]`

const LightButton = props => (
  <button
    tw="cursor-pointer text-gray-600 bg-transparent border-0 rounded-sm text-xs hover:text-gray-800 outline-color[darkorange]"
    tabIndex={0}
    {...props}
  />
)

const Button = tw.button`font[inherit] no-underline padding[.4em .8em] bg-blue-600  hover:active:bg-blue-700 text-white rounded-sm leading-none whitespace-nowrap inline-block border-0 cursor-pointer transition-colors align-middle outline-color[salmon]`;

const VButton = styled(Button)(({ variant }) => [
  tw`rounded-none  padding[.5em .6em]`,
  variant === "contained" ? tw`bg-purple-800 hover:bg-black text-white` : tw`bg-white hover:bg-gray-100 text-purple-900 `
])


const VButtonGroup = styled.div(() => [
  css`
  border-width: 1px;
  ${tw`rounded-sm border-solid border-gray-600 sm:flex-none flex flex-auto`}
  button {
    flex: inherit;
  }
  > button + button {
    border-left-width: 1px; 
    ${tw` border-l-gray-600`}
  }
`,
  tw`text-sm md:text-base w-full sm:w-auto`
])

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
      tw="padding[9px] bg-transparent border-none text-decoration[none] user-select[none] flex items-center justify-center vertical-align[middle] border-radius[50%] hover:bg-gray-200  focus:bg-gray-200 cursor-pointer outline-none transition-colors "
      type="button"
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

const textInputBorderStyles = [
  tw` text-left absolute top[-5px] left-0 right-0 bottom-0 m-0 py-0 px-2 pointer-events-none overflow-hidden min-w-0 rounded-sm border-width[1px] border-gray-400 border-solid`
];
const textInputStyles = css`
    ${tw`w-full px-1 py-2 border-none outline-none font[inherit] color[currentColor]`}
    &:focus ~ fieldset {
      ${tw`border-2 border-purple-600`}
    }
  `;

const textInputRootStyles = css`
    ${tw`relative inline-flex font[inherit]`}
    &:hover > fieldset {
      ${tw`border-gray-800`}
    }
  `;
const TextField = React.forwardRef((props, ref) => {
  const { InputProps, fullWidth, ...rest } = props;

  return (
    <div css={[textInputRootStyles, fullWidth && tw`w-full`]} >
      {
        InputProps.startAdornment ? (
          <div tw="mr-1 inline-flex justify-center items-center pl-2">
            {InputProps.startAdornment}
          </div>
        ) : null
      }
      <input type="text" ref={ref} {...rest} css={textInputStyles} />
      <fieldset aria-hidden="true" css={textInputBorderStyles}>
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
    <RouterLink to={to} {...rest} tw=" bg-purple-200 text-purple-900 hover:(bg-purple-900 text-white) outline-color[darkorange] text-xs opacity-75 border-solid border-width[1px] border-purple-800 rounded-sm padding[.1rem .5rem] no-underline">
      {label}
    </RouterLink>
  )
}
const Avatar = (props) => {
  const { src, alt, to, ...rest } = props
  return (
    <RouterLink to={to || '#'} tw="w-10 h-10 rounded-sm mr-2" {...rest}>
      <img src={src} alt={alt} tw="text-transparent w-full h-full object-cover text-center "></img>
    </RouterLink>
  )
}
const Link = styled(RouterLink)`
  text-decoration: none;
  ${tw`text-purple-600 hover:text-purple-800`}
`;

const EmptyLink = styled.button`
  text-decoration: none;
  ${tw`bg-transparent border-0 text-purple-900 hover:text-purple-600`}
`;
const Divider = styled.hr(({ orientation }) => [
  tw`my-0 border-width[1px] h-auto`,
  orientation === 'vertical' ? tw`border-l-0 border-right-color[lightgray]` : tw`border-b-0 border-top-color[lightgray] `
]);

const MenuItem = styled(RouterLink)(({ selected }) => [
  tw`flex items-center justify-start whitespace-nowrap no-underline relative text-left overflow-hidden transition-colors w-auto px-2 py-1 font[inherit] hover:(bg-black bg-opacity-5) align-middle margin[.1em]`,
  selected && tw`bg-black bg-opacity-10`,
  css`-webkit-tap-highlight-color: transparent;`
])

const MenuContainer = styled.div(({ open }) => [
  tw`fixed z-index[1300] inset-0 invisible`,
  open && tw`visible`
])
const MenuBackDrop = styled.div([
  tw`fixed inset-0 z-index[-1] bg-transparent`,
  css`-webkit-tap-highlight-color: transparent;`
])

const MenuChildrenContainer = styled.div(({ open }) => [
  tw`absolute rounded-sm overflow-x-hidden overflow-y-auto outline-none shadow-default bg-white text-gray-900 opacity-0 transition-default invisible transform scale-x-75 scale-y-50 border-[1px] border-gray-300`,
  open && tw`visible transform-none opacity-100`,
])

const Menu = ({ open, anchorEl, anchorOrigin, transformOrigin, onClose, children, ...rest }) => {

  const [anchorPos, setAnchorPos] = useState(null);

  useEffect(() => {
    if (anchorEl) {
      setAnchorPos(anchorEl.getBoundingClientRect())
    }
  }, [anchorEl])

  const { ref, modalRoot } = useModal({
    onClose,
    focusAfterClosed: anchorEl
  })


  const getAnchorOriginPos = () => {
    let pos = {};
    pos.top = anchorOrigin.vertical === "top" ? `calc(${anchorPos.top}px + 10px)` : `calc(${anchorPos.bottom}px + 10px)`;
    if (anchorOrigin.horizontal === 'left') {
      pos.left = `calc(${anchorPos.left}px + 5px)`;
    }
    else {
      pos.right = `calc(100vw - ${anchorPos.right - 10}px)`
    }
    return pos;
  }
  const anchorXY = anchorPos && {
    right: `calc(${anchorPos.right}px - 10px)`
  }
  const menu = (
    <MenuContainer role="presentation" open={open}>
      {
        open && (
          <MenuBackDrop>
          </MenuBackDrop>
        )
      }
      <div tabIndex={0}></div>
      <MenuChildrenContainer ref={ref} tabIndex={-1} {...rest} css={anchorXY && { ...getAnchorOriginPos(), transformOrigin: `${transformOrigin.horizontal || '0px'} ${transformOrigin.vertical || '0px'}` }} open={open}>
        {
          children
        }
      </MenuChildrenContainer>
      <div tabIndex={0}></div>
    </MenuContainer>
  )
  return ReactDOM.createPortal(menu, modalRoot)
}

export { MenuItem, IconButton, SvgIcon, LightButton, Button, Checkbox, TextArea, TextField, ChipLink, Avatar, Link, Divider, EmptyLink, VButton, VButtonGroup, Menu };
