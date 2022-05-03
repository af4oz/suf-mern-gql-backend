import tw from 'twin.macro'
import React, { ComponentProps } from 'react'
import { Link } from 'react-router-dom'

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

const tagStyles = tw`inline-flex items-center bg-blue-200 bg-opacity-75 rounded-sm text-blue-700 no-underline text-xs padding[.1em .5em] outline-color[darkblue] hover:bg-opacity-100`

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

export default Tag
