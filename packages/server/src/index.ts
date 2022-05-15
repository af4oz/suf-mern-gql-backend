import { PORT } from './utils/config'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './createSchema'
import connectToDB from './db'
import { FRONTEND_URL, IS_PROD } from './constants'
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core'

async function bootstrap() {
  try {
    await connectToDB()

    // Create GraphQL server
    const schema = await createSchema()

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req }),
      cors: {
        origin: FRONTEND_URL,
        credentials: true,
      },
      plugins: [
        IS_PROD
          ? ApolloServerPluginLandingPageProductionDefault()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
      ],
    })

    // Start the server
    const { url } = await server.listen(PORT)
    console.log(
      `Server is running, GraphQL Playground available at ${url} and port: ${PORT}`
    )
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
