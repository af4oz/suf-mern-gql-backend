import { Link } from 'react-router-dom'
import PostedByUser from './PostedByUser'
import tw from 'twin.macro' //eslint-disable-line no-unused-vars
import { Question as IQuestion } from '../generated/graphql'

import { Tag } from './CompStore'

const StatsContainer = tw.div`ml-0 mr-1 sm:(ml-2 mr-3) text-center text-xs`

const QuestionContainer = tw.div`w-full`

const Container = tw.div`flex p-1 sm:p-2`

const Question = tw.h3`m-0 mb-2`

interface QuesCardProps {
  question: IQuestion
}

const QuesCard = ({ question }: QuesCardProps) => {
  const {
    _id,
    title,
    author,
    body,
    tags,
    points,
    views,
    answerCount,
    createdAt,
  } = question

  return (
    <Container>
      <StatsContainer>
        <div>
          <span tw="block text-gray-600 text-sm">{points}</span>
          <div>votes</div>
        </div>
        <div tw="my-2">
          <span tw="block text-gray-600 text-sm">{answerCount}</span>
          <div>answers</div>
        </div>
        <div>{views} views</div>
      </StatsContainer>
      <QuestionContainer>
        <Question>
          <Link
            tw="no-underline text-blue-600 font-normal hover:text-blue-800"
            to={`/questions/${_id}`}
          >
            {title}
          </Link>
        </Question>
        <p tw="m-0 pb-1 text-xs">{body}</p>
        <div tw="flex flex-wrap float-left">
          {tags.map((t) => (
            <Tag
              tag="a"
              key={t}
              href={`/tags/${t}`}
              styles={{ link: tw`margin[0 .25em .25em]` }}
            >
              {t}
            </Tag>
          ))}
        </div>
        <PostedByUser
          username={author.username}
          userId={author._id}
          createdAt={createdAt}
        />
      </QuestionContainer>
    </Container>
  )
}

export default QuesCard
