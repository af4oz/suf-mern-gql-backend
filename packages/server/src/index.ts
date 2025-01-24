import { PORT } from './utils/config'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './createSchema'
import connectToDB from './db'
import { FRONTEND_URLS, IS_PROD } from './constants'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'

async function bootstrap() {
  await connectToDB()

  // Create GraphQL server
  const schema = await createSchema()

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    cors: {
      origin: FRONTEND_URLS,
      credentials: true,
    },
    plugins: [
      IS_PROD
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  })

  server.listen({ port: PORT }).then(({ url, port }) => {
    console.log(`🚀 Server ready at ${url}${port ? 'on port ' + port : ''}`)
  })
}

bootstrap()
