import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { VIEW_QUESTION } from '../graphql/queries'
import { useStateContext } from '../context/state'
import { useAuthContext } from '../context/auth'
import QuesPageContent from '../components/QuesPageContent'
import RightSidePanel from '../components/RightSidePanel'
import AuthFormModal from '../components/AuthFormModal'
import LoadingSpinner from '../components/LoadingSpinner'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import tw,{styled} from 'twin.macro' //eslint-disable-line no-unused-vars

const QuestionContainer = styled.div`
  display: flex;
  >:first-child {
    flex-basis: 70%;
    margin-right: .5rem;
  }
`
const QuestionPage = () => {
  const { clearEdit, notify } = useStateContext()
  const { user } = useAuthContext()
  const { quesId } = useParams()
  const [question, setQuestion] = useState(null)
  const [fetchQuestion, { data, loading }] = useLazyQuery(VIEW_QUESTION, {
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
      setQuestion(data.viewQuestion)
    }
  }, [data])

  if (loading || !question) {
    return (
      <div style={{ minWidth: '100%', marginTop: '20%' }}>
        <LoadingSpinner size={80} />
      </div>
    )
  }

  const { title, views, createdAt, updatedAt } = question

  return (
    <div tw="p-4">
      <div>
        <div tw="flex justify-between  flex-nowrap flex-col sm:flex-row ">
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
      </div>
      <QuestionContainer>
        <QuesPageContent question={question}/>
        <RightSidePanel />
      </QuestionContainer>
    </div>
  )
}

export default QuestionPage
