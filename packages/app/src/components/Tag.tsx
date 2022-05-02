import tw, { styled } from 'twin.macro' //eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom'
import { ComponentProps } from 'react'

const Container = tw.span`inline-flex items-center h-auto `

const TagWord = tw.span`inline-flex items-center h-auto rounded-sm bg-blue-200 bg-opacity-75 `

interface TagProps extends ComponentProps<'span'> {
  to: string
  label?: string
  count?: number
}
const Tag = ({ to, children, label, count, ...rest }: TagProps) => (
  <Container {...rest}>
    <TagWord>
      <Link
        to={to}
        tw=" text-blue-700 no-underline text-xs padding[.1rem .5rem] outline-color[darkorange]"
      >
        {label}
      </Link>
    </TagWord>
    {count && (
      <div tw="text-xs text-blue-600 inline">&nbsp; {` × ${count}`}</div>
    )}
  </Container>
)

type TagsProps = {
  col?: boolean
  floatLeft?: boolean
}
export const Tags = styled.div((props: TagsProps) => [
  `
	span + span {
    ${props.col && props.col ? `margin-top: .2em` : `margin-left: .2em`}
	}
`,
  tw`flex flex-wrap`,
  props.col ? tw`flex-col` : tw`flex-row`,
  props.floatLeft && tw`float-left`,
])
export default Tag
