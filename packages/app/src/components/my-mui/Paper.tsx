import tw from 'twin.macro'
import React, { ComponentProps } from 'react'

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

export default Paper
