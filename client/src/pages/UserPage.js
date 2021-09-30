import { useState, useEffect } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { GET_USER } from '../graphql/queries'
import RecentQuestions from '../components/RecentQuestions'
import LoadingSpinner from '../components/LoadingSpinner'
import { useStateContext } from '../context/state'
import { formatDateAgo, getErrorMsg } from '../utils/helperFuncs'

import { Avatar, Typography, Divider } from '@material-ui/core'
import { useUserPageStyles } from '../styles/muiStyles'
import tw from 'twin.macro';

const UserPage = () => {
  const classes = useUserPageStyles()
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
    <div className={classes.root}>
      <div tw="bg-purple-200 bg-opacity-50 h-56 w-48 flex flex-col justify-center items-center rounded-sm">
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
      </div>
      <div className={classes.infoCard} tw="text-purple-900">
        <div tw="flex justify-between color[inherit] ">
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
        </div>
        <div className={classes.recentActivity}>
          <div style={{ marginBottom: '1em' }}>
            <Typography variant="h6" color="primary">
              Last Asked Questions
            </Typography>
            <Divider />
            {recentQuestions.length !== 0 ? (
              recentQuestions.map(q => (
                <div key={q.id}>
                  <RecentQuestions question={q} />
                  <Divider />
                </div>
              ))
            ) : (
              <Typography variant="subtitle1">
                No questions asked yet.
              </Typography>
            )}
          </div>
          <div>
            <Typography variant="h6" color="primary">
              Last Answered Questions
            </Typography>
            <Divider />
            {recentAnswers.length !== 0 ? (
              recentAnswers.map(q => (
                <div key={q.id}>
                  <RecentQuestions question={q} />
                  <Divider />
                </div>
              ))
            ) : (
              <Typography variant="subtitle1">
                No questions answered yet.
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage
