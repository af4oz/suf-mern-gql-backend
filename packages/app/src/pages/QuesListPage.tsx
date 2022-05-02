import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useAppContext } from '../context/state'
import { useAuthContext } from '../context/auth'
import SortQuesBar from '../components/SortQuesBar'
import QuesCard from '../components/QuesCard'
import AuthFormModal from '../components/AuthFormModal'
import LoadMoreButton from '../components/LoadMoreButton'
import LoadingSpinner from '../components/LoadingSpinner'
import { filterDuplicates, getErrorMsg } from '../utils/helperFuncs'

import tw, { styled } from 'twin.macro'
import { Divider, Button } from '../components/CompStore'
import {
  FetchQuestionsQuery,
  FetchQuestionsQueryVariables,
  Question,
  SortByType,
  useFetchQuestionsLazyQuery,
} from '../generated/graphql'

const QuestionListContainer = styled.div`
  ${tw`relative w-full mx-1 mt-6 sm:mx-3 `}
`

const QuestionListHeader = styled.div`
  ${tw`flex justify-between items-center`}
`

const QuestionListBody = styled.div``

interface QuesListPageProps {
  tagFilterActive?: boolean
  searchFilterActive?: boolean
}

const QuesListPage = ({
  tagFilterActive,
  searchFilterActive,
}: QuesListPageProps) => {
  const { tagName, query } = useParams<{ tagName: string; query: string }>()
  const { clearEdit, notify } = useAppContext()
  const { user } = useAuthContext()
  const [quesData, setQuesData] = useState<
    FetchQuestionsQuery['getQuestions'] | null
  >(null)
  const [sortBy, setSortBy] = useState<SortByType>(SortByType.Hot)
  const [page, setPage] = useState(1)

  const [fetchQuestions, { data, loading }] = useFetchQuestionsLazyQuery({
    fetchPolicy: 'network-only',
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  const getQues = (args: FetchQuestionsQueryVariables) => {
    fetchQuestions({
      variables: { ...args },
    })
  }

  useEffect(() => {
    getQues({
      sortBy,
      page: 1,
      limit: 12,
      filterByTag: tagName,
      filterBySearch: query,
    })
    setPage(1)
    window.scrollTo(0, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, tagName, query])

  useEffect(() => {
    if (data && page === 1) {
      setQuesData(data.getQuestions)
    }

    if (data && page !== 1) {
      setQuesData((prevState) => ({
        ...data.getQuestions,
        questions: prevState!.questions.concat(
          filterDuplicates<Question>(
            prevState!.questions as Question[],
            data.getQuestions.questions as Question[]
          )
        ),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleLoadPosts = () => {
    getQues({
      sortBy,
      page: page + 1,
      limit: 12,
      filterByTag: tagName,
      filterBySearch: query,
    })
    setPage(page + 1)
  }

  return (
    <QuestionListContainer>
      <QuestionListHeader>
        <h2 tw="text-lg sm:text-xl font-normal text-purple-900 m-0">
          {tagFilterActive
            ? `Questions tagged [${tagName}]`
            : searchFilterActive
            ? `Search results for "${query}"`
            : 'All Questions'}
        </h2>
        {user ? (
          <RouterLink to="/ask" onClick={() => clearEdit()}>
            <Button tw="bg-purple-700 hover:bg-purple-800 text-sm sm:text-base">
              Ask Question
            </Button>
          </RouterLink>
        ) : (
          <AuthFormModal buttonType="ask" />
        )}
      </QuestionListHeader>
      <SortQuesBar sortBy={sortBy} setSortBy={setSortBy} />
      <Divider />
      <QuestionListBody>
        {loading && page === 1 && (
          <div style={{ minWidth: '100%', marginTop: '1em' }}>
            <LoadingSpinner size="large" />
          </div>
        )}
        {quesData &&
          (quesData.questions.length !== 0 ? (
            quesData.questions.map((q) => (
              <QuesCard key={q?._id} question={q as Question} />
            ))
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
