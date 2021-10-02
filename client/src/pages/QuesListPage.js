import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GET_QUESTIONS } from '../graphql/queries'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useStateContext } from '../context/state'
import { useAuthContext } from '../context/auth'
import SortQuesBar from '../components/SortQuesBar'
import QuesCard from '../components/QuesCard'
import AuthFormModal from '../components/AuthFormModal'
import LoadMoreButton from '../components/LoadMoreButton'
import LoadingSpinner from '../components/LoadingSpinner'
import { filterDuplicates, getErrorMsg } from '../utils/helperFuncs'

import {  useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import tw ,{styled} from 'twin.macro' // eslint-disable-line no-unused-vars
import {Divider,Button} from '../components/CompStore'

const QuestionListContainer = styled.div`${tw`w-full mt-6 mx-3`}`;

const QuestionListHeader = styled.div`${tw`flex justify-between items-center`}`;

const QuestionListBody = styled.div``;

const QuesListPage = ({ tagFilterActive, searchFilterActive }) => {
  const { tagName, query } = useParams()
  const { clearEdit, notify } = useStateContext()
  const { user } = useAuthContext()
  const [quesData, setQuesData] = useState(null)
  const [sortBy, setSortBy] = useState('HOT')
  const [page, setPage] = useState(1)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))
  const [fetchQuestions, { data, loading }] = useLazyQuery(GET_QUESTIONS, {
    fetchPolicy: 'network-only',
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const getQues = (sortBy, page, limit, filterByTag, filterBySearch) => {
    fetchQuestions({
      variables: { sortBy, page, limit, filterByTag, filterBySearch },
    })
  }

  useEffect(() => {
    getQues(sortBy, 1, 12, tagName, query)
    setPage(1)
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, tagName, query])

  useEffect(() => {
    if (data && page === 1) {
      setQuesData(data.getQuestions)
    }

    if (data && page !== 1) {
      setQuesData(prevState => ({
        ...data.getQuestions,
        questions: prevState.questions.concat(
          filterDuplicates(prevState.questions, data.getQuestions.questions)
        ),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleLoadPosts = () => {
    getQues(sortBy, page + 1, 12, tagName, query)
    setPage(page + 1)
  }

  return (
    <QuestionListContainer >
      <QuestionListHeader >
        <h2
          tw="font-normal text-purple-900 m-0"
        >
          {tagFilterActive
            ? `Questions tagged [${tagName}]`
            : searchFilterActive
            ? `Search results for "${query}"`
            : 'All Questions'}
        </h2>
        {user ? (
          <RouterLink
            to="/ask"
            onClick={() => clearEdit()}
          > 
          <Button
          tw="bg-purple-700 hover:bg-purple-800 text-base"
          >
            Ask Question
          </Button>
          </RouterLink>
        ) : (
          <AuthFormModal buttonType="ask" />
        )}
      </QuestionListHeader>
      <SortQuesBar isMobile={isMobile} sortBy={sortBy} setSortBy={setSortBy} />
      <Divider />
      <QuestionListBody>
      {loading && page === 1 && (
        <div style={{ minWidth: '100%', marginTop: '1em' }}>
          <LoadingSpinner size={60} />
        </div>
      )}
      {quesData &&
        (quesData.questions.length !== 0 ? (
          quesData.questions.map(q => <QuesCard key={q.id} question={q} />)
        ) : (
          <h3 tw="text-center text-purple-900 mt-10">
            {tagFilterActive
              ? `There are no questions tagged "${tagName}".`
              : searchFilterActive
              ? `No matches found for your search "${query}".`
              : 'No questions found.'}
          </h3>
        ))}
      </QuestionListBody>
      {quesData && quesData.next && (
        <LoadMoreButton
          loading={page !== 1 && loading}
          handleLoadPosts={handleLoadPosts}
        />
      )}
    </QuestionListContainer>
  )
}

export default QuesListPage
