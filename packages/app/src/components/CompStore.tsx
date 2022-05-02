/** 
  Mostly copied from Material UI 
*/
import React, {
  ComponentProps,
  ComponentPropsWithoutRef,
  HTMLProps,
  ReactNode,
  RefObject,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react'
import ReactDOM from 'react-dom'
import { AiOutlineWarning as WarningIcon } from 'react-icons/ai'
import { IoMdCheckmarkCircleOutline as SuccessIcon } from 'react-icons/io'
import {
  MdClear as ClearIcon,
  MdErrorOutline as ErrorIcon,
} from 'react-icons/md'
import { RiInformationLine as InfoIcon } from 'react-icons/ri'
import { Link as RouterLink } from 'react-router-dom'
import tw, { css, styled } from 'twin.macro' // eslint-disable-line no-unused-vars
import useModal from '../hooks/useModal'

const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none] font-size[1.5em]`

const LightButton = (props: ComponentProps<'button'>) => (
  <button
    css={[
      tw`cursor-pointer text-gray-600 bg-transparent border-0 rounded-sm text-xs hover:text-gray-800 outline-color[darkorange]`,
    ]}
    tabIndex={0}
    type="button"
    {...props}
  />
)

const Button = tw.button`font[inherit] no-underline padding[.4em .8em] bg-blue-600  hover:bg-blue-700 text-white rounded-sm leading-none whitespace-nowrap inline-block border-0 cursor-pointer transition-colors align-middle outline-color[salmon]`

const VButton = styled(Button)(
  ({ variant }: { variant: 'contained' | 'outlined' }) => [
    tw`rounded-none  padding[.5em .6em]`,
    variant === 'contained'
      ? tw`bg-blue-700  hover:bg-blue-800 text-white`
      : tw`bg-white hover:bg-gray-100 text-blue-900 `,
  ]
)

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
  tw`text-sm md:text-base w-full sm:w-auto`,
])

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

type TStyles = {
  [key: string]: any
}

const iconButtonStyles = css`
  ${tw`padding[9px] bg-transparent border-none text-decoration[none] user-select[none] flex items-center justify-center vertical-align[middle] border-radius[50%] cursor-pointer outline-none transition-colors `}
`
type IconButtonProps<T extends 'button' | 'a'> = {
  tag: T
  styles?: TStyles
} & ComponentProps<T>

declare function IconButtonFn<Tag extends 'a' | 'button'>(
  props: IconButtonProps<Tag>
): JSX.Element

const IconButton = React.forwardRef<HTMLElement, IconButtonProps<any>>(
  function IconButton(props, ref) {
    const { tag, styles, href, children, ...rest } = props
    let iconButton
    if (tag === 'a') {
      iconButton = (
        <RouterLink
          to={href}
          css={[iconButtonStyles, styles && styles.iconButton]}
          {...rest}
          ref={ref as RefObject<HTMLAnchorElement>}
        >
          {children}
        </RouterLink>
      )
    } else {
      iconButton = (
        <button
          css={[iconButtonStyles, styles && styles.iconButton]}
          type="button"
          ref={ref as RefObject<HTMLButtonElement>}
          {...rest}
        >
          {children}
        </button>
      )
    }
    return <>{iconButton}</>
  }
) as typeof IconButtonFn

interface TextAreaProps extends ComponentProps<'textarea'> {
  size: 'small' | 'large'
  fullWidth?: boolean
  error?: boolean
  helperText?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
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
  }
)

const inputBorderStyles = [
  tw` text-left absolute inset-0 m-0 py-0 px-2 pointer-events-none overflow-hidden min-w-0 rounded-sm border-width[1px] border-gray-400 border-solid`,
]
const inputStyles = css`
  ${tw`w-full border-none outline-none select-none font[inherit] color[currentColor]`}
  &:focus ~ fieldset {
    ${tw`border-2 border-purple-600`}
  }
`

const inputRootStyles = css`
  ${tw`px-1 py-2 relative inline-flex font[inherit]`}
  &:hover > fieldset {
    ${tw`border-gray-800`}
  }
`
const fieldRootStyles = css`
  ${tw`p-0 align-top min-w-0 border-0 inline-flex flex-col relative`}
`
const inputLabelStyles = css`
  ${tw`block font[inherit] p-0 text-black text-opacity-[.5] transform-origin[left top] whitespace-nowrap transition-default overflow-ellipsis z-index[1] transform translate-x-3 translate-y-2  scale-100 absolute top-0 left-0 overflow-hidden`}
`
const inputLabelActiveStyles = css`
  ${tw`translate-y-[-.4em] scale-75 color[inherit]`}
`

const InputAdornment = React.forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function InputAdornment(props, ref) {
    return (
      <div
        css={[tw`inline-flex justify-center items-center px-1 font[inherit]`]}
        {...props}
        ref={ref}
      ></div>
    )
  }
)

interface OwnTextFieldProps<T> {
  InputProps?: {
    startAdornment?: JSX.Element | null
    endAdornment?: JSX.Element | null
  }
  fullWidth?: boolean
  label?: string
  error?: boolean
  helperText?: string
  styles?: TStyles
  tag: T
}
type TextFieldProps<T extends 'input' | 'textarea'> = OwnTextFieldProps<T> &
  ComponentProps<T>

declare function TextFieldFn<T extends 'input' | 'textarea'>(
  props: TextFieldProps<T>
): JSX.Element

const TextField = React.forwardRef<HTMLElement, TextFieldProps<any>>(
  function TextField(props, ref) {
    const {
      InputProps = {},
      fullWidth,
      styles,
      label,
      tag,
      error,
      helperText,
      ...rest
    } = props
    const { startAdornment, endAdornment } = InputProps

    return (
      <div
        css={[
          fieldRootStyles,
          fullWidth && tw`w-full`,
          styles && styles.fieldRoot,
        ]}
      >
        <div
          css={[
            inputRootStyles,
            fullWidth && tw`w-full`,
            styles && styles.inputRoot,
          ]}
        >
          {label ? (
            <label
              css={[
                inputLabelStyles,
                inputLabelActiveStyles,
                error && tw`text-red-500!`,
              ]}
            >
              {label}
            </label>
          ) : null}
          {startAdornment ? startAdornment : null}
          {tag === 'textarea' ? (
            <textarea
              ref={ref as RefObject<HTMLTextAreaElement>}
              {...rest}
              css={[inputStyles, styles && styles.input]}
            />
          ) : (
            <input
              type="text"
              ref={ref as RefObject<HTMLInputElement>}
              {...rest}
              css={[inputStyles, styles && styles.input]}
            />
          )}
          <fieldset
            aria-hidden="true"
            css={[inputBorderStyles, error && tw`border-red-500!`]}
          >
            <legend
              tw="block max-w-0 p-0 invisible line-height[11px]"
              style={{ maxWidth: '100%' }}
            >
              <span>{label}</span>
            </legend>
          </fieldset>
          {endAdornment ? endAdornment : null}
        </div>
        {error ? (
          <p css={[tw`text-xs`, error && tw`text-red-500!`]}>{helperText}</p>
        ) : null}
      </div>
    )
  }
) as typeof TextFieldFn

interface AvatarProps extends ComponentProps<typeof RouterLink> {
  to: string
  src: string
  alt: string
  styles?: {
    avatarRoot?: any
    img?: any
  }
}
const Avatar = (props: AvatarProps) => {
  const { src, alt, to, styles, ...rest } = props
  return (
    <RouterLink
      to={to}
      css={[tw`w-10 h-10 rounded-sm mr-2`, styles && styles.avatarRoot]}
      {...rest}
    >
      <img
        src={src}
        alt={alt}
        css={[
          tw`text-transparent w-full h-full object-cover text-center `,
          styles && styles.img,
        ]}
      ></img>
    </RouterLink>
  )
}
const Link = styled(RouterLink)`
  text-decoration: none;
  ${tw`text-blue-600 hover:text-blue-800`}
`

const EmptyLink = styled.button`
  text-decoration: none;
  ${tw`bg-transparent border-0 text-blue-600 hover:text-blue-800`}
`
type DividerProps = {
  orientation?: 'vertical' | 'horizontal'
}
const Divider = styled.hr(({ orientation }: DividerProps) => [
  tw`my-0 border-width[1px] h-auto`,
  orientation === 'vertical'
    ? tw`border-l-0 border-right-color[lightgray]`
    : tw`border-b-0 border-top-color[lightgray] `,
])

type MenuItemStyledProps = {
  selected?: boolean
}
type MenuItemProps<T extends 'div' | 'a'> = {
  tag: T
  selected?: boolean
} & ComponentProps<T>

declare function MenuItemFn<T extends 'div' | 'a'>(
  props: MenuItemProps<T>
): JSX.Element

const MenuItemStyled = styled.div(({ selected }: MenuItemStyledProps) => [
  tw`flex items-center justify-start whitespace-nowrap no-underline relative text-left overflow-hidden transition-colors w-auto px-2 py-1 font[inherit] bg-white text-black hover:(bg-black bg-opacity-5) align-middle margin[.1em] rounded-sm select-none`,
  selected && tw`bg-black bg-opacity-10`,
  css`
    -webkit-tap-highlight-color: transparent;
  `,
])

const MenuItem = React.forwardRef<HTMLElement, MenuItemProps<any>>(
  function MenuItem(props, ref) {
    const { tag, href, selected, children, ...rest } = props
    if (tag === 'a') {
      return (
        <RouterLink to={href} ref={ref} {...rest}>
          <MenuItemStyled selected={selected}>{children}</MenuItemStyled>
        </RouterLink>
      )
    }
    return (
      <MenuItemStyled selected={selected} ref={ref} {...rest}>
        {children}
      </MenuItemStyled>
    )
  }
) as typeof MenuItemFn

const MenuContainer = styled.div(({ open }: { open: boolean }) => [
  tw`fixed z-index[1300] inset-0 invisible`,
  open && tw`visible`,
])
const MenuBackDrop = styled.div(() => [
  tw`fixed inset-0 z-index[-1] bg-transparent`,
  css`
    -webkit-tap-highlight-color: transparent;
  `,
])

const MenuChildrenContainer = styled.div(({ open }: { open: boolean }) => [
  tw`absolute rounded-sm overflow-x-hidden overflow-y-auto outline-none shadow-default bg-white text-gray-900 opacity-0 transition-default invisible transform scale-x-75 scale-y-50 border-[1px] border-gray-300`,
  open && tw`visible transform-none opacity-100`,
])

interface MenuProps {
  open: boolean
  anchorEl: HTMLElement | undefined
  anchorOrigin: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right'
  }
  transformOrigin: {
    vertical: 'top' | 'center' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  onClose: () => void
  children?: ReactNode
}
const Menu = ({
  open,
  anchorEl,
  anchorOrigin,
  transformOrigin,
  onClose,
  children,
  ...rest
}: MenuProps) => {
  const [anchorPos, setAnchorPos] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (anchorEl) {
      setAnchorPos(anchorEl.getBoundingClientRect())
    }
  }, [anchorEl])

  const { ref, modalRoot } = useModal<HTMLDivElement>({
    onClose,
    focusAfterClosed: anchorEl,
    overlayModal: false,
  })

  const getAnchorOriginPos = () => {
    let pos: any = {}
    if (anchorPos) {
      pos.top =
        anchorOrigin.vertical === 'top'
          ? `calc(${anchorPos.top}px + 10px)`
          : `calc(${anchorPos.bottom}px + 10px)`
      if (anchorOrigin.horizontal === 'left') {
        pos.left = `calc(${anchorPos.left}px + 5px)`
      } else {
        pos.right = `calc(100vw - ${anchorPos.right - 10}px)`
      }
      return pos
    }
  }
  const menu = (
    <MenuContainer role="presentation" open={open}>
      {open && <MenuBackDrop></MenuBackDrop>}
      <div tabIndex={0}></div>
      <MenuChildrenContainer
        ref={ref}
        tabIndex={-1}
        {...rest}
        css={
          anchorPos && {
            ...getAnchorOriginPos(),
            transformOrigin: `${transformOrigin.horizontal || '0px'} ${
              transformOrigin.vertical || '0px'
            }`,
          }
        }
        open={open}
      >
        {children}
      </MenuChildrenContainer>
      <div tabIndex={0}></div>
    </MenuContainer>
  )
  return ReactDOM.createPortal(menu, modalRoot)
}
interface ChipWithCloseProps extends ComponentProps<'span'> {
  label: string
  onDelete?: React.MouseEventHandler<HTMLButtonElement>
}
const chipStyles = tw`bg-purple-200 text-purple-900 hover:(bg-purple-900 text-white) outline-color[darkorange] text-xs opacity-75 border-solid border-width[1px] border-purple-800 rounded-sm padding[.1rem .5rem] no-underline
`
const ChipWithClose = (props: ChipWithCloseProps) => {
  const { label, onDelete, ...rest } = props
  return (
    <span
      css={[
        chipStyles,
        tw`flex items-center h-6 box-content margin[2px] pl-3 pr-1`,
      ]}
      {...rest}
    >
      {label}
      <button
        type="button"
        onClick={onDelete}
        tw="ml-1 font-bold bg-transparent text-xs text-purple-800"
      >
        &#x2716;
      </button>
    </span>
  )
}

interface AutoCompleteProps {
  disabled?: boolean
  value: any
  inputValue: any
  renderInput: (params: TextFieldProps<'input'>) => JSX.Element
  onInputChange?: (
    event: SyntheticEvent,
    newValue: any,
    reason?: string,
    details?: any
  ) => void
  onChange?: (
    event: SyntheticEvent,
    newValue: any,
    reason?: string,
    details?: any
  ) => void
  renderTags?: (
    value: any,
    getTagProps: (params: {
      index: number
    }) => Partial<ChipWithCloseProps> & HTMLProps<HTMLElement>
  ) => ReactNode
  fullWidth?: boolean
  ChipProps?: any
}
const Autocomplete = React.forwardRef<HTMLInputElement, AutoCompleteProps>(
  function Autocomplete(
    {
      disabled,
      value: valueProp,
      inputValue: inputValueProp,
      onInputChange,
      onChange,
      renderInput,
      renderTags,
      fullWidth,
      ChipProps,
      ...rest
    },
    ref
  ) {
    const hasClearIcon = !disabled && (inputValueProp || valueProp.length > 0)
    const [value, setValue] = useState(valueProp)
    const [inputValue, setInputValue] = useState(inputValueProp || '')

    const handleValue = (
      event: SyntheticEvent,
      newValue: any,
      reason: string,
      details?: any
    ) => {
      if (value === newValue) return

      if (onChange) {
        onChange(event, newValue, reason, details)
      }
      setValue(newValue)
    }
    const handleTagDelete = (index: number) => (event: SyntheticEvent) => {
      const newValue = value.slice()
      newValue.splice(index, 1)
      handleValue(event, newValue, 'removeOption', {
        option: value[index],
      })
    }
    const handleClear = (e: React.SyntheticEvent) => {
      setInputValue('')

      if (onInputChange) {
        onInputChange(e, '', 'clear')
      }

      handleValue(e, [], 'clear')
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value

      if (inputValue !== newValue) {
        setInputValue(newValue)

        if (onInputChange) {
          onInputChange(event, newValue, 'input')
        }
      }
    }
    const resetInputValue = React.useCallback(
      (event: any, newValue: any) => {
        let newInputValue
        if (!newValue) {
          newInputValue = ''
        } else {
          newInputValue = newValue
        }

        setInputValue(newInputValue)

        if (onInputChange) onInputChange(event, newValue, 'reset')
      },
      [setInputValue, onInputChange]
    )

    const selectNewValue = (
      event: SyntheticEvent,
      option: any,
      reason = 'selectOption'
    ) => {
      let newValue = Array.isArray(value) ? value.slice() : []

      const itemIndex = value.findIndex((val: any) => val === option)

      if (itemIndex === -1) {
        newValue.push(option)
        handleValue(event, newValue, reason, { option })
      }
      resetInputValue(event, '')
    }
    const handleKeyDown = (event: React.KeyboardEvent) => {
      switch (event.key) {
        case 'Enter':
          // Avoid early form validation
          event.preventDefault()

          if (disabled) return

          if (!inputValue) return

          selectNewValue(event, inputValue, 'selectOption')
          break
        default:
          return
      }
    }

    const getTagProps = ({ index }: { index: number }) => ({
      key: index,
      'data-tag-index': index,
      tabIndex: -1,
      onDelete: handleTagDelete(index),
    })
    const getClearProps = () => ({
      tabIndex: -1,
      onClick: handleClear,
    })

    let startAdornment
    if (value.length > 0) {
      if (renderTags) {
        startAdornment = renderTags(value, getTagProps)
      } else {
        startAdornment = value.map((option: string, index: number) => (
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
        <div onKeyDown={handleKeyDown}>
          {renderInput({
            tag: 'input',
            disabled,
            fullWidth: true,
            ref,
            value: inputValue,
            onChange: handleInputChange,
            // tw: "flex-grow[1]",
            InputProps: {
              startAdornment,
              endAdornment: hasClearIcon ? (
                <InputAdornment
                  {...getClearProps()}
                  tw="cursor-pointer font-size[1.5em]"
                >
                  <ClearIcon></ClearIcon>
                </InputAdornment>
              ) : null,
            },
            styles: {
              input: tw`flex-grow-default w-0 min-w-[8em] `,
              inputRoot: tw`flex-wrap`,
            },
            ...rest,
          })}
        </div>
      </>
    )
  }
)

interface AlertProps extends ComponentProps<'div'> {
  severity?: 'error' | 'info' | 'warning' | 'success'
  onClose?: React.MouseEventHandler
  title?: string
  children?: ReactNode
  styles?: {
    alertRoot: any
    alertTitle: any
    alertBody: any
    alertStartIcon: any
    alertEndIcon: any
  }
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  const { severity, onClose, title, children, styles, ...rest } = props
  let icon, bgStyles
  if (severity === 'error') {
    icon = <ErrorIcon />
    bgStyles = tw`bg-red-600`
  } else if (severity === 'info') {
    icon = <InfoIcon />
    bgStyles = tw`bg-blue-600`
  } else if (severity === 'warning') {
    icon = <WarningIcon />
    bgStyles = tw`bg-orange-600`
  } else {
    icon = <SuccessIcon />
    bgStyles = tw`bg-green-600`
  }
  return (
    <div
      css={[
        tw`text-xs sm:text-sm flex items-center justify-between min-width[240px] p-1 md:p-2 text-white bg-gray-900 bg-opacity-75 shadow-sm rounded-sm  font-bold leading-5 tracking-wide `,
        bgStyles && bgStyles,
        styles && styles.alertRoot,
      ]}
    >
      <div>
        {title ? (
          <div css={[tw`font-bold`, styles && styles.alertTitle]}>{title}</div>
        ) : null}
        <div
          css={[
            tw`flex items-center font[inherit]`,
            styles && styles.alertBody,
          ]}
          ref={ref}
          {...rest}
        >
          <div
            css={[
              tw`flex mr-2 py-1 color[inherit] font-size[1.2em]`,
              styles && styles.alertStartIcon,
            ]}
          >
            {icon}
          </div>
          <div css={[tw`py-1`]}>{children}</div>
        </div>
      </div>
      {onClose ? (
        <IconButton
          tag="button"
          css={[
            tw`font-size[1.2em] color[inherit]`,
            styles && styles.alertEndIcon,
          ]}
          onClick={onClose}
        >
          <ClearIcon />
        </IconButton>
      ) : null}
    </div>
  )
})
interface SnackbarProps extends ComponentProps<'div'> {
  open: boolean
  anchorOrigin: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  children: ReactNode
}
const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  function SnackBar(props, ref) {
    const { open, anchorOrigin, children, ...rest } = props
    let posStyles
    let mobilePosStyles = tw`bottom[24px] left-1/2 transform -translate-x-1/2 right-auto`
    const { vertical, horizontal } = anchorOrigin
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
    return (
      <>
        {open ? (
          <div
            css={[
              tw`fixed z-index[1400] flex items-center justify-start`,
              mobilePosStyles,
              posStyles,
            ]}
            ref={ref}
            {...rest}
          >
            {children}
          </div>
        ) : null}
      </>
    )
  }
)
const tagStyles = tw`inline-flex items-center bg-blue-200 bg-opacity-75 rounded-sm text-blue-700 no-underline text-xs padding[.1em .5em] outline-color[darkblue] hover:bg-opacity-100`

interface OwnTagProps<T> {
  tag: T
  label?: string
  styles?: {
    link?: any
    tag?: any
  }
}

type TagProps<T extends 'span' | 'a'> = OwnTagProps<T> & ComponentProps<T>

declare function TagFn<T extends 'span' | 'a'>(props: TagProps<T>): JSX.Element

const Tag = React.forwardRef<HTMLElement, TagProps<any>>(function Tag(
  props,
  ref
) {
  const { href, label, styles, children, ...rest } = props
  let tag
  if (href) {
    tag = (
      <Link
        to={href}
        ref={ref}
        css={[tw`no-underline`, styles && styles.link]}
        {...rest}
      >
        <span css={[tagStyles, styles && styles.tag]}>{label || children}</span>
      </Link>
    )
  } else {
    tag = (
      <span ref={ref} css={[tagStyles, styles && styles.tag]} {...rest}>
        {label}
      </span>
    )
  }
  return <>{tag}</>
}) as typeof TagFn

const paperStyles = tw`flex flex-1 min-h-screen w-screen flex-col rounded-sm bg-white text-black text-opacity-[.87]`

interface PaperProps extends ComponentProps<'div'> {
  elevation?: boolean
  styles?: {
    paperRoot?: any
  }
}
const Paper = React.forwardRef<HTMLDivElement, PaperProps>(function Paper(
  props,
  ref
) {
  const { children, elevation, styles, ...rest } = props

  return (
    <div
      css={[
        paperStyles,
        elevation && tw`shadow-sm`,
        styles && styles.paperRoot,
      ]}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
})

export {
  MenuItem,
  IconButton,
  SvgIcon,
  LightButton,
  Button,
  Checkbox,
  TextArea,
  TextField,
  Avatar,
  Link,
  Divider,
  EmptyLink,
  VButton,
  VButtonGroup,
  Menu,
  Autocomplete,
  ChipWithClose,
  InputAdornment,
  Alert,
  Snackbar,
  Tag,
  Paper,
}
