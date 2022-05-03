import tw from 'twin.macro'
import React, { ComponentProps } from 'react'

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

export default InputAdornment
