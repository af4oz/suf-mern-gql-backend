import React, { RefObject, ComponentProps } from 'react'
import tw, { css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { TCustomStyleClasses } from './types'

const inputBorderStyles = [
  tw` text-left absolute inset-0 m-0 py-0 px-2 pointer-events-none overflow-hidden min-w-0 rounded-md border-width[1px] border-gray-400 border-solid`,
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
    ${tw`border-purple-600`}
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

interface OwnTextFieldProps<T> {
  InputProps?: {
    startAdornment?: JSX.Element | null
    endAdornment?: JSX.Element | null
  }
  fullWidth?: boolean
  label?: string
  error?: boolean
  helperText?: string
  styles?: TCustomStyleClasses
  tag: T
}
export type TextFieldProps<T extends 'input' | 'textarea'> =
  OwnTextFieldProps<T> & ComponentProps<T>

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

export default TextField
