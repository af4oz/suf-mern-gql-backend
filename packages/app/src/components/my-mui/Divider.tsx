import tw, { styled } from 'twin.macro'

type DividerProps = {
  orientation?: 'vertical' | 'horizontal'
}
const Divider = styled.hr(({ orientation }: DividerProps) => [
  tw`my-0 border-width[1px] h-auto`,
  orientation === 'vertical'
    ? tw`border-l-0 border-right-color[lightgray]`
    : tw`border-b-0 border-top-color[lightgray] `,
])

export default Divider
