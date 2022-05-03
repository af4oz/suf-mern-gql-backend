import React, { RefObject, ComponentProps } from 'react'
import tw, { css } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom'
import { TCustomStyleClasses } from './types'

const iconButtonStyles = css`
  ${tw`padding[9px] bg-transparent border-none text-decoration[none] user-select[none] flex items-center justify-center vertical-align[middle] border-radius[50%] cursor-pointer outline-none transition-colors `}
`
type IconButtonProps<T extends 'button' | 'a'> = {
  tag: T
  styles?: TCustomStyleClasses
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
        <Link
          to={href}
          css={[iconButtonStyles, styles && styles.iconButton]}
          {...rest}
          ref={ref as RefObject<HTMLAnchorElement>}
        >
          {children}
        </Link>
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

export default IconButton
