import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import RecentQuestions from '../components/RecentQuestions'
import LoadingSpinner from '../components/LoadingSpinner'
import { useStateContext } from '../context/state'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import tw,{styled} from 'twin.macro';
import {Divider} from '../components/CompStore';

const UserInfo = styled.div`
  ${tw`flex justify-between color[inherit] items-center`}
`
const UserActivity = styled.div`${tw`mt-4`}`

const UserAvatar = styled.div`
  ${tw`bg-purple-200 bg-opacity-50 h-56 w-48 flex flex-col justify-center items-center rounded-sm`}
`
const UserCard = styled.div`
${tw`w-full mt-4 ml-2 flex flex-row flex-wrap text-sm md:text-base`}
`
const UserPage = () => {
  const { notify } = useStateContext()
  const { username } = useParams()
  const [fetchedUser, setFetchedUser] = useState(null)
  const [fetchUser, { data, loading }] = useLazyQuery(GET_USER, {
    onError: err => {
      notify(getErrorMsg(err), 'error')
    },
  })

  useEffect(() => {
    fetchUser({ variables: { username } })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(() => {
    if (data) {
      setFetchedUser(data.getUser)
    }
  }, [data])

  if (loading || !fetchedUser) {
    return (
      <div style={{ minWidth: '100%', marginTop: '20%' }}>
        <LoadingSpinner size={80} />
      </div>
    )
  }

  const {
    id,
    username: userName,
    createdAt,
    reputation,
    totalQuestions,
    totalAnswers,
    recentQuestions,
    recentAnswers,
  } = fetchedUser

  return (
    <UserCard>
      <UserAvatar>
        <RouterLink
          tw=""
          to={`/user/${username}`}
        >
          <img 
          src={`https://secure.gravatar.com/avatar/${id}?s=164&d=identicon`}
          alt={username}
          />
        </RouterLink>
        <p tw="text-purple-900 text-xl">
          {reputation} <span tw="text-sm">REPUTATION</span>
        </p>
      </UserAvatar>
      <div  tw="text-purple-900 flex-1 mt-2 md:ml-2">
        <UserInfo>
          <div>
            <h1
            tw="text-purple-800 my-0"
            >
              {userName}
            </h1>
            <span
            tw="color[inherit]"
            >
              member for {formatDateAgo(createdAt)}
            </span>
          </div>
          <div tw="flex text-center">
            <div style={{ marginRight: 10 }}>
              <h2
              tw="my-0"
              >
                {totalAnswers}
              </h2>
              <span
              >
                answers
              </span>
            </div>
            <div>
              <h2
              tw="my-0"
              >
                {totalQuestions}
              </h2>
              <span
              >
                questions
              </span>
            </div>
          </div>
        </UserInfo>
        <UserActivity >
          <div tw="mb-5">
            <h3 tw="margin[.5rem .1rem] ">
              Last Asked Questions
            </h3>
            <Divider />
            {recentQuestions.length !== 0 ? (
              recentQuestions.map(q => (
                <div key={q.id}>
                  <RecentQuestions question={q} />
                  <Divider />
                </div>
              ))
            ) : (
              <p >
                No questions asked yet.
              </p>
            )}
          </div>
          <div>
            <h3 tw="margin[.5rem .1rem]">
              Last Answered Questions
            </h3>
            <Divider />
            {recentAnswers.length !== 0 ? (
              recentAnswers.map(q => (
                <div key={q.id}>
                  <RecentQuestions question={q} />
                  <Divider />
                </div>
              ))
            ) : (
              <p>
                No questions answered yet.
              </p>
            )}
          </div>
        </UserActivity>
      </div>
    </UserCard>
  )
}

export default UserPage
