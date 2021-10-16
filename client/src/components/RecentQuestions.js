import { formatDateAgo } from '../utils/helperFuncs'

import tw, { styled } from 'twin.macro' // eslint-disable-line no-unused-vars
import { Link } from '../components/CompStore';

const PointsBox = styled.div(() => [
  tw`inline-flex px-2 py-1 border-width[1px] border-solid border-purple-900 line-height[1.2em]`
])

const RecentQuestions = ({ question }) => {

  return (
    <div tw="flex justify-between text-purple-900 p-1 items-center">
      <div tw="flex items-center flex-basis[80%] flex-grow-0 flex-shrink-0">
        <PointsBox>
          {question.points}
        </PointsBox>
        <Link
          to={`/questions/${question._id}`}
          tw="font-normal ml-2 sm:ml-1"
        >
          {question.title}
        </Link>
      </div>
      <span tw="text-xs">
        {formatDateAgo(question.createdAt)} ago
      </span>
    </div>
  )
}

export default RecentQuestions
