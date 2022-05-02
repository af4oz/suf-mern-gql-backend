import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import RecentQuestions from '../components/RecentQuestions'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAppContext } from '../context/state'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import tw, { styled } from 'twin.macro'
import { Divider } from '../components/CompStore'
import { useFetchUserLazyQuery, User } from '../generated/graphql'

const UserInfo = styled.div`
  ${tw`flex justify-between color[inherit] items-center`}
`
const UserActivity = styled.div`
  ${tw`mt-4`}
`

const UserAvatar = styled.div`
  ${tw`bg-purple-200 bg-opacity-50 h-56 w-48 flex flex-col justify-center items-center rounded-sm mx-auto`}
`
const UserCard = styled.div`
  ${tw`w-full my-4 ml-2 mx-1 sm:ml-2 flex flex-row flex-wrap text-sm md:text-base`}
`
const UserPage = () => {
  const { notify } = useAppContext()
  const { username } = useParams<{ username: string }>()
  const [fetchedUser, setFetchedUser] = useState<User | null>(null)

  const [fetchUser, { data, loading }] = useFetchUserLazyQuery({
    onError: (err) => {
      notify(getErrorMsg(err), 'error')
    },
  })

  useEffect(() => {
    if (username) {
      fetchUser({ variables: { username } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username])

  useEffect(() => {
    if (data) {
      setFetchedUser(data.getUser as User)
    }
  }, [data])

  if (loading || !fetchedUser) {
    return (
      <div style={{ minWidth: '100%', marginTop: '20%' }}>
        <LoadingSpinner />
      </div>
    )
  }

  const {
    _id,
    username: userName,
    createdAt,
    rep,
    totalQuestions,
    totalAnswers,
    recentQuestions,
    recentAnswers,
  } = fetchedUser

  return (
    <UserCard>
      <UserAvatar>
        <RouterLink tw="" to={`/user/${username}`}>
          <img
            src={`https://secure.gravatar.com/avatar/${_id}?s=164&d=identicon`}
            alt={username}
          />
        </RouterLink>
        <p tw="text-purple-900 text-xl my-2">
          {rep} <span tw="text-sm">REPUTATION</span>
        </p>
      </UserAvatar>
      <div tw="text-purple-900 flex-1 mt-2 md:ml-2">
        <UserInfo>
          <div>
            <h1 tw="text-2xl text-purple-800 ">{userName}</h1>
            <span tw="color[inherit]">
              member for {formatDateAgo(createdAt)}
            </span>
          </div>
          <div tw="flex text-center">
            <div style={{ marginRight: 10 }}>
              <h2 tw="my-0">{totalAnswers}</h2>
              <span>answers</span>
            </div>
            <div>
              <h2 tw="my-0">{totalQuestions}</h2>
              <span>questions</span>
            </div>
          </div>
        </UserInfo>
        <UserActivity>
          <div tw="mb-5">
            <h3 tw="margin[.5rem .1rem] font-bold">Last Asked Questions</h3>
            <Divider />
            {recentQuestions.length !== 0 ? (
              recentQuestions.map((q) => (
                <div key={q?._id}>
                  <RecentQuestions creedo={q!} />
                  <Divider />
                </div>
              ))
            ) : (
              <p>No questions asked yet.</p>
            )}
          </div>
          <div>
            <h3 tw="margin[.5rem .1rem] font-bold">Last Answered Questions</h3>
            <Divider />
            {recentAnswers.length !== 0 ? (
              recentAnswers.map((q) => (
                <div key={q?._id}>
                  <RecentQuestions creedo={q!} />
                  <Divider />
                </div>
              ))
            ) : (
              <p>No questions answered yet.</p>
            )}
          </div>
        </UserActivity>
      </div>
    </UserCard>
  )
}

export default UserPage
