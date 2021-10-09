import React from 'react'
import ReactDOM from "react-dom";
import tw, { styled, css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import useModal from '../hooks/useModal';
import { MdErrorOutline as ErrorIcon } from 'react-icons/md';
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai';
import { RiInformationLine as InfoIcon } from 'react-icons/ri';
import { IoMdCheckmarkCircleOutline as SuccessIcon } from 'react-icons/io';
import { MdClear as ClearIcon } from 'react-icons/md';

const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none] font-size[1.5em]`

const LightButton = props => (
  <button
    css={[tw`cursor-pointer text-gray-600 bg-transparent border-0 rounded-sm text-xs hover:text-gray-800 outline-color[darkorange]`]}
    tabIndex={0}
    {...props}
  />
)

const Button = tw.button`font[inherit] no-underline padding[.4em .8em] bg-blue-600  hover:bg-blue-700 text-white rounded-sm leading-none whitespace-nowrap inline-block border-0 cursor-pointer transition-colors align-middle outline-color[salmon]`;

const VButton = styled(Button)(({ variant }) => [
  tw`rounded-none  padding[.5em .6em]`,
  variant === "contained" ? tw`bg-blue-700  hover:bg-blue-800 text-white` : tw`bg-white hover:bg-gray-100 text-blue-900 `
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
      css={[tw`padding[9px] bg-transparent border-none text-decoration[none] user-select[none] items-center justify-center vertical-align[middle] border-radius[50%] hover:bg-gray-200  focus:bg-gray-200 cursor-pointer outline-none transition-colors `]}
      onClick={onChange}
      {...otherProps}
    >
      {checked ? checkedIcon : icon}
    </button>
  )
}

const iconButtonStyles = css`
${tw`padding[9px] bg-transparent border-none text-decoration[none] user-select[none] flex items-center justify-center vertical-align[middle] border-radius[50%] cursor-pointer outline-none transition-colors `}
`
const IconButton = React.forwardRef(function IconButton(props, ref) {

  const { to, styles, children, ...rest } = props;
  let iconButton;
  if (to) {
    iconButton = (
      <RouterLink to={to} css={[iconButtonStyles, styles && styles.iconButton]} {...rest} ref={ref}
      >
        {children}
      </RouterLink>
    )
  }
  else {
    iconButton = (
      <button
        css={[iconButtonStyles, styles && styles.iconButton]}
        type="button"
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    )
  }
  return (
    <>{iconButton}</>
  )
})

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

const inputBorderStyles = [
  tw` text-left absolute inset-0 m-0 py-0 px-2 pointer-events-none overflow-hidden min-w-0 rounded-sm border-width[1px] border-gray-400 border-solid`
];
const inputStyles = css`
    ${tw`w-full border-none outline-none select-none font[inherit] color[currentColor]`}
    &:focus ~ fieldset {
      ${tw`border-2 border-purple-600`}
    }
  `;

const inputRootStyles = css`
    ${tw`px-1 py-2 relative inline-flex font[inherit]`}
    &:hover > fieldset {
      ${tw`border-gray-800`}
    }
  `;
const fieldRootStyles = css`
  ${tw`p-0 align-top min-w-0 border-0 inline-flex flex-col relative`}
`
const inputLabelStyles = css`
    ${tw`block font[inherit] p-0 text-black text-opacity-[.5] transform-origin[left top] whitespace-nowrap transition-default overflow-ellipsis z-index[1] transform translate-x-3 translate-y-2  scale-100 absolute top-0 left-0 overflow-hidden`}
`
const inputLabelActiveStyles = css`
${tw`translate-y-[-.4em] scale-75 color[inherit]`}
`;

const InputAdornment = React.forwardRef(function InputAdornment(props, ref) {
  return (
    <div css={[tw`inline-flex justify-center items-center px-1 font[inherit]`]} {...props} ref={ref}>
    </div>
  )
})

const TextField = React.forwardRef(function TextField(props, ref) {
  const { InputProps = {}, fullWidth, styles, label, multiline, error, helperText, ...rest } = props;
  const { startAdornment, endAdornment } = InputProps;

  return (
    <div css={[fieldRootStyles, fullWidth && tw`w-full`, styles && styles.fieldRoot]}>
      <div css={[inputRootStyles, fullWidth && tw`w-full`, styles && styles.inputRoot]} >
        {
          label ? (<label css={[inputLabelStyles, inputLabelActiveStyles, error && tw`text-red-500!`]}>{label}</label>) : null
        }
        {
          startAdornment ? (
            startAdornment
          ) : null
        }
        {
          multiline ? (
            <textarea ref={ref} {...rest} css={[inputStyles, styles && styles.input]} />
          ) : (
            <input type="text" ref={ref} {...rest} css={[inputStyles, styles && styles.input]} />
          )
        }
        <fieldset aria-hidden="true" css={[inputBorderStyles, error && tw`border-red-500!`]}>
          <legend tw="block max-w-0 p-0 invisible line-height[11px]" style={{ maxWidth: "100%" }}>
            <span>{label}</span>
          </legend>
        </fieldset>
        {
          endAdornment ? (
            endAdornment

          ) : null
        }
      </div >
      {
        error ? (
          <p css={[tw`text-xs`, error && tw`text-red-500!`]}>{helperText}</p>
        ) : null
      }
    </div>
  )
})

const Avatar = (props) => {
  const { src, alt, to, styles, ...rest } = props
  return (
    <RouterLink to={to || '#'} css={[tw`w-10 h-10 rounded-sm mr-2`, styles && styles.avatarRoot]} {...rest}>
      <img src={src} alt={alt} css={[tw`text-transparent w-full h-full object-cover text-center `, styles && styles.img]}></img>
    </RouterLink>
  )
}
const Link = styled(RouterLink)`
  text-decoration: none;
  ${tw`text-blue-600 hover:text-blue-800`}
`;

const EmptyLink = styled.button`
  text-decoration: none;
  ${tw`bg-transparent border-0 text-blue-600 hover:text-blue-800`}
`;
const Divider = styled.hr(({ orientation }) => [
  tw`my-0 border-width[1px] h-auto`,
  orientation === 'vertical' ? tw`border-l-0 border-right-color[lightgray]` : tw`border-b-0 border-top-color[lightgray] `
]);

const MenuItemStyled = styled.div(({ selected }) => [
  tw`flex items-center justify-start whitespace-nowrap no-underline relative text-left overflow-hidden transition-colors w-auto px-2 py-1 font[inherit] bg-white text-black hover:(bg-black bg-opacity-5) align-middle margin[.1em] rounded-sm select-none`,
  selected && tw`bg-black bg-opacity-10`,
  css`-webkit-tap-highlight-color: transparent;`
])
const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { to, selected, children, ...rest } = props;
  if (to) {
    return (
      <RouterLink to={to} ref={ref} {...rest}>
        <MenuItemStyled selected={selected} >
          {children}
        </MenuItemStyled>
      </RouterLink>
    )
  }
  return (
    <MenuItemStyled selected={selected} ref={ref} {...rest}>
      {children}
    </MenuItemStyled>
  )
})

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
    focusAfterClosed: anchorEl,
    overlayModal: false
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
const chipStyles = tw`bg-purple-200 text-purple-900 hover:(bg-purple-900 text-white) outline-color[darkorange] text-xs opacity-75 border-solid border-width[1px] border-purple-800 rounded-sm padding[.1rem .5rem] no-underline
`;
const ChipWithClose = (props) => {
  const { label, onDelete, ...rest } = props
  return (
    <span css={[chipStyles, tw`flex items-center h-6 box-content margin[2px] pl-3 pr-1`]} {...rest} >
      {label}
      <button type="button" onClick={onDelete} tw="ml-1 font-bold bg-transparent text-xs text-purple-800">&#x2716;</button>
    </span>
  )
}

const Autocomplete = React.forwardRef(function Autocomplete({ disabled, value: valueProp, inputValue: inputValueProp, onInputChange, onChange, renderInput, renderTags, fullWidth, ChipProps, ...rest }, ref) {

  const hasClearIcon = !disabled && (inputValueProp || valueProp.length > 0);
  const [value, setValue] = useState(valueProp);
  const [inputValue, setInputValue] = useState(inputValueProp || '');

  const handleValue = (event, newValue, reason, details) => {
    if (value === newValue) return;

    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValue(newValue)
  }
  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, 'removeOption', {
      option: value[index]
    })
  }
  const handleClear = (e) => {
    setInputValue('')

    if (onInputChange) {
      onInputChange(e, '', 'clear')
    }

    handleValue(e, [], 'clear')
  }
  const handleInputChange = (event) => {
    const newValue = event.target.value;

    if (inputValue !== newValue) {
      setInputValue(newValue)

      if (onInputChange) {
        onInputChange(event, newValue, 'input')
      }
    }
  }
  const resetInputValue = React.useCallback((event, newValue) => {

    let newInputValue;
    if (!newValue) {
      newInputValue = '';
    }
    else {
      newInputValue = newValue
    }

    setInputValue(newInputValue);

    if (onInputChange) onInputChange(event, newValue, 'reset');

  }, [setInputValue, onInputChange])

  const selectNewValue = (event, option, reason = 'selectOption') => {
    let newValue = Array.isArray(value) ? value.slice() : [];

    const itemIndex = value.findIndex((val) => val === option)

    if (itemIndex === -1) {
      newValue.push(option)
      handleValue(event, newValue, reason, { option })
    }
    resetInputValue(event, '')

  }
  const handleKeyDown = (event) => {

    switch (event.key) {
      case "Enter":
        // Avoid early form validation
        event.preventDefault();

        if (disabled) return;

        if (!inputValue) return;

        selectNewValue(event, inputValue, 'selectOption');
        break;
      default:
        return;
    }
  }

  const getTagProps = ({ index }) => ({
    key: index,
    'data-tag-index': index,
    tabIndex: -1,
    onDelete: handleTagDelete(index)
  })
  const getClearProps = () => ({
    tabIndex: -1,
    onClick: handleClear
  })

  let startAdornment;
  if (value.length > 0) {
    if (renderTags) {
      startAdornment = renderTags(value, getTagProps)
    } else {
      startAdornment = value.map((option, index) => (
        <ChipWithClose
          label={option}
          {...getTagProps({ index })}
          {...ChipProps}
        />
      ))
    }
  }
  return (
    <>
      <div
        onKeyDown={handleKeyDown}
      >
        {renderInput({
          disabled,
          fullWidth: true,
          ref,
          value: inputValue,
          onChange: handleInputChange,
          tw: "flex-grow[1]",
          InputProps: {
            startAdornment,
            endAdornment: (
              hasClearIcon ? (
                <InputAdornment {...getClearProps()} tw="cursor-pointer font-size[1.5em]">
                  <ClearIcon ></ClearIcon>
                </InputAdornment>
              ) : null
            ),
            styles: {
              input: tw`flex-grow-default w-0 min-w-[8em] `,
              inputRoot: tw`flex-wrap`,
            }

          },
          ...rest
        })}
      </div>
    </>
  )
})

const Alert = React.forwardRef(function Alert(props, ref) {
  const { severity, onClose, title, children, styles, ...rest } = props;
  let icon, bgStyles;
  if (severity === 'error') {
    icon = <ErrorIcon />;
    bgStyles = tw`bg-red-600`;
  } else if (severity === 'info') {
    icon = <InfoIcon />;
    bgStyles = tw`bg-blue-600`;
  } else if (severity === 'warning') {
    icon = <WarningIcon />;
    bgStyles = tw`bg-orange-600`;
  } else {
    icon = <SuccessIcon />;
    bgStyles = tw`bg-green-600`;
  }
  return (
    <div css={[tw`text-xs sm:text-sm flex items-center justify-between min-width[240px] p-1 md:p-2 text-white bg-gray-900 bg-opacity-75 shadow-sm rounded-sm  font-bold leading-5 tracking-wide `, bgStyles && bgStyles, styles && styles.alertRoot]}>
      <div>
        {
          title ? (
            <div css={[tw`font-bold`, styles && styles.alertTitle]}>
              {title}
            </div>
          ) : null
        }
        <div css={[tw`flex items-center font[inherit]`, styles && styles.alertBody]} ref={ref} {...rest}>
          <div css={[tw`flex mr-2 py-1 color[inherit] font-size[1.2em]`, styles && styles.alertStartIcon]}>
            {
              icon
            }
          </div>
          <div css={[tw`py-1`]}>{children}</div>
        </div>
      </div>
      {
        onClose ? (
          <IconButton css={[tw`font-size[1.2em] color[inherit]`, styles && styled.alertEndIcon]} onClick={onClose}>
            <ClearIcon />
          </IconButton>
        ) : null
      }
    </div>
  )
})
const Snackbar = React.forwardRef(function SnackBar(props, ref) {
  const { open, onClose, anchorOrigin, styles, children, ...rest } = props;
  let posStyles;
  let mobilePosStyles = tw`bottom[24px] left-1/2 transform -translate-x-1/2 right-auto`
  if (anchorOrigin) {
    const { vertical, horizontal } = anchorOrigin;
    if (horizontal === 'left' && vertical === 'top') {
      posStyles = tw`md:(left[24px] top[24px] right-auto)`
    } else if (horizontal === 'right' && vertical === 'top') {
      posStyles = tw`md:(right[24px] top[24px] left-auto)`
    } else if (horizontal === 'center' && vertical === 'top') {
      posStyles = tw`md:(left-1/2 top[24px] -translate-x-1/2)`
    } else if (horizontal === 'right' && vertical === 'bottom') {
      posStyles = tw`md:(right[24px] bottom[24px] left-auto)`
    } else if (horizontal === 'left' && vertical === 'bottom') {
      posStyles = tw`md:(left[24px] bottom[24px] right-auto)`
    } else if (horizontal === 'center' && vertical === 'bottom') {
      posStyles = tw`bottom[24px] left-1/2 -translate-x-1/2 right-auto`
    }
  }
  return (
    <>
      {
        open ? (
          <div css={[tw`fixed z-index[1400] flex items-center justify-start`, mobilePosStyles, posStyles]} ref={ref} {...rest}>
            {children}
          </div>
        ) : null
      }
    </>
  )
})
const tagStyles = tw`inline-flex items-center bg-blue-200 bg-opacity-75 rounded-sm text-blue-700 no-underline text-xs padding[.1em .5em] outline-color[darkblue] hover:bg-opacity-100`;

const Tag = React.forwardRef(function Tag(props, ref) {
  const { to, label, styles, children, ...rest } = props;
  let tag;
  if (to) {
    tag = (
      <Link to={to} ref={ref} css={[tw`no-underline`, styles && styles.link]} {...rest}>
        <span css={[tagStyles, styles && styles.tag]}>{label || children}</span>
      </Link>
    )
  }
  else {
    tag = (
      <span ref={ref} css={[tagStyles, styles && styles.tag]} {...rest}>
        {label}
      </span>
    )
  }
  return (
    <>
      {tag}
    </>
  )
})

const paperStyles = tw`flex flex-1 min-h-screen w-screen flex-col rounded-sm bg-white text-black text-opacity-[.87]`;
const Paper = React.forwardRef(function Paper(props, ref) {
  const { children, elevation, styles, ...rest } = props;

  return (
    <div css={[paperStyles, elevation && tw`shadow-sm`, styles && styles.paperRoot]} ref={ref} {...rest}>
      {children}
    </div>
  )
})

export { MenuItem, IconButton, SvgIcon, LightButton, Button, Checkbox, TextArea, TextField, Avatar, Link, Divider, EmptyLink, VButton, VButtonGroup, Menu, Autocomplete, ChipWithClose, InputAdornment, Alert, Snackbar, Tag, Paper };
