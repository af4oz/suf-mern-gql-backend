import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppContext } from '../context/state'
import { useAuthContext } from '../context/auth'
import QuesPageContent from '../components/QuesPageContent'
import AuthFormModal from '../components/AuthFormModal'
import LoadingSpinner from '../components/LoadingSpinner'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import tw from 'twin.macro';
import { Question, useFetchQuestionLazyQuery } from '../generated/graphql'

const Container = tw.div`p-2 w-full`;
const Header = tw.div``;

const QuestionPage = () => {
  const { clearEdit, notify } = useAppContext();
  const { user } = useAuthContext()
  const { quesId } = useParams<{ quesId: string }>()
  const [question, setQuestion] = useState<Question | null>(null)

  const [fetchQuestion, { data, loading }] = useFetchQuestionLazyQuery({
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  useEffect(() => {
    fetchQuestion({ variables: { quesId } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesId])

  useEffect(() => {
    if (data) {
      setQuestion(data.viewQuestion as Question)
    }
  }, [data])

  if (loading || !question) {
    return (
      <Container >
        <LoadingSpinner />
      </Container>
    )
  }

  const { title, views, createdAt, updatedAt } = question

  return (
    <Container>
      <Header>
        <div tw="flex sm:(justify-between items-center) flex-nowrap flex-col sm:flex-row ">
          <h1 tw="m-0 mb-1 font-normal text-2xl word-wrap[break-word]">
            {title}
          </h1>
          {user ? (
            <div tw="p-0 m-0 ml-2 align-baseline  order[-1] self-end sm:(order-none self-auto) ">
              <Link
                to="/ask"
                onClick={() => clearEdit()}
                tw="no-underline px-4 py-2 bg-blue-600  text-white text-xs rounded-sm leading-none whitespace-nowrap inline-block"
              >
                Ask Question
              </Link>
            </div>
          ) : (
            <AuthFormModal buttonType="ask" />
          )}
        </div>
        <div tw="pb-2 text-xs mb-2 ">
          <span>
            Asked <strong>{formatDateAgo(createdAt)} ago</strong>
          </span>
          {createdAt !== updatedAt && (
            <span tw="ml-2">
              Edited <strong>{formatDateAgo(updatedAt)} ago</strong>
            </span>
          )}
          <span tw="ml-2">
            Viewed <strong>{views} times</strong>
          </span>
        </div>
      </Header>
      <QuesPageContent question={question} />
    </Container>
  )
}

export default QuestionPage
