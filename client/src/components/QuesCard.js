import { Link } from 'react-router-dom'
import PostedByUser from './PostedByUser'
import tw from 'twin.macro'; //eslint-disable-line no-unused-vars

import Tag, { Tags } from './Tag'

const StatsContainer = tw.div`ml-2 mr-3`

const QuestionContainer = tw.div`w-full`

const Container = tw.div`flex p-2`

const Question = tw.h3`m-0 mb-2`

const QuesCard = ({ question }) => {
  const {
    id,
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
        <div tw="text-center">
          <span tw="block text-gray-600">{points}</span>
          <div tw="text-xs">votes</div>
        </div>
        <div tw="text-center mt-2">
          <span tw="block text-gray-600">{answerCount}</span>
          <div tw="text-xs">answers</div>
        </div>
        <div tw="text-xs mt-2 text-center">{views} views</div>
      </StatsContainer>
      <QuestionContainer>
        <Question>
          <Link
            tw="no-underline text-blue-600 font-normal"
            to={`/questions/${id}`}
          >
            {title}
          </Link>
        </Question>
        <p tw="m-0 pb-1 text-xs">{body}</p>
        <Tags floatLeft>
          {tags.map(t => (
            <Tag key={t} to={`/tags/${t}`}>
              {t}
            </Tag>
          ))}
        </Tags>
        <PostedByUser
          username={author.username}
          userId={author.id}
          createdAt={createdAt}
        />
      </QuestionContainer>
    </Container>
  )
}

export default QuesCard
