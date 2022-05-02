import { PORT } from './utils/config'
import { ApolloServer } from 'apollo-server'
import { createSchema } from './createSchema'
import connectToDB from './db'

async function bootstrap() {
  try {
    await connectToDB()

    // Create GraphQL server
    const schema = await createSchema()

    // Create GraphQL server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req }),
    })

    // Start the server
    const { url } = await server.listen(PORT || 4000)
    console.log(`Server is running, GraphQL Playground available at ${url}`)
  } catch (err) {
    console.error(err)
  }
}

bootstrap()
