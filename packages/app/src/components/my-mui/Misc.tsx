import { ComponentProps } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import tw, { css, styled } from 'twin.macro' // eslint-disable-line no-unused-vars

export const SvgIcon = tw.svg`fill-current width[1em] height[1em] inline-block transition-colors flex-shrink-0 user-select[none] font-size[1.5em]`

export const LightButton = (props: ComponentProps<'button'>) => (
  <button
    css={[
      tw`cursor-pointer text-gray-600 bg-transparent border-0 rounded-md text-xs hover:text-gray-800 outline-color[darkorange]`,
    ]}
    tabIndex={0}
    type="button"
    {...props}
  />
)

export const Button = tw.button`font[inherit] no-underline padding[.8em 1em] bg-blue-600  hover:bg-blue-700 text-white rounded-md leading-none whitespace-nowrap inline-block border-0 cursor-pointer transition-colors align-middle outline-color[salmon]`

export const VButton = styled(Button)(
  ({ variant }: { variant: 'contained' | 'outlined' }) => [
    tw`rounded-none  padding[.5em .6em]`,
    variant === 'contained'
      ? tw`bg-blue-700  hover:bg-blue-800 text-white`
      : tw`bg-white hover:bg-gray-100 text-blue-900 `,
  ]
)

export const ButtonGroup = styled.div(() => [
  css`
    border-width: 1px;
    ${tw`rounded-md border-solid border-gray-600 sm:flex-none flex flex-auto`}
    button {
      flex: inherit;
    }
    > button + button {
      border-left-width: 1px;
      ${tw` border-l-gray-600`}
    }
    button:last-child {
      ${tw`rounded-r-md`}
    }
    button:firt-child {
      ${tw`rounded-l-md`}
    }
  `,
  tw`text-sm md:text-base w-full sm:w-auto`,
])

export const Link = styled(RouterLink)`
  text-decoration: none;
  ${tw`text-blue-600 hover:text-blue-800`}
`

export const EmptyLink = styled.button`
  text-decoration: none;
  ${tw`bg-transparent border-0 text-blue-600 hover:text-blue-800`}
`
