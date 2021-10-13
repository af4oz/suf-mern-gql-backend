import { ApolloServer } from 'apollo-server'
import connectToDB from './db'
import typeDefs from './graphql/typeDefs'
import resolvers from './resolvers'
import { PORT } from './utils/config'


connectToDB()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
})

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
