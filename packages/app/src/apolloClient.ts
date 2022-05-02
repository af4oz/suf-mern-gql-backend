import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import storage from './utils/localStorage'
import backendUrl from './backendUrl'

const httpLink = new HttpLink({
  uri: backendUrl,
})

const authLink = setContext(() => {
  const loggedUser = storage.loadUser()

  return {
    headers: {
      authorization: loggedUser ? loggedUser.token : null,
    },
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Question: {
        fields: {
          upvotedBy: {
            merge(_, incoming) {
              return incoming
            },
          },
          downvotedBy: {
            merge(_, incoming) {
              return incoming
            },
          },
          comments: {
            merge(_, incoming) {
              return incoming
            },
          },
          answers: {
            merge(_, incoming) {
              return incoming
            },
          },
          tags: {
            merge(_, incoming) {
              return incoming
            },
          },
        },
      },
      Answer: {
        fields: {
          upvotedBy: {
            merge(_, incoming) {
              return incoming
            },
          },
          downvotedBy: {
            merge(_, incoming) {
              return incoming
            },
          },
          comments: {
            merge(_, incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
  link: from([authLink, httpLink]),
})

export default client
