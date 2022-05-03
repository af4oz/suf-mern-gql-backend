import tw from 'twin.macro'
import React, { ComponentProps, ReactNode } from 'react'

interface SnackbarProps extends ComponentProps<'div'> {
  open: boolean
  anchorOrigin: {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'right' | 'center'
  }
  children: ReactNode
}
export const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
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
