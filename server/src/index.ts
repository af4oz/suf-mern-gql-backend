import { ApolloServer } from 'apollo-server'
import path from 'path';
import { buildSchema } from 'type-graphql'
import connectToDB from './db'
import { PORT } from './utils/config'
import { TypegooseMiddleware } from './middlewares/typegoose';
import { GraphQLDateTime } from 'graphql-iso-date'
import { ObjectId } from 'mongodb'

import { GraphQLScalarType, Kind } from "graphql";
import { UserResolver } from './resolvers/user';

export const ObjectIdScalar = new GraphQLScalarType({
  name: "ObjectId",
  description: "Mongo object id scalar type",
  parseValue(value: string) {
    return new ObjectId(value); // value from the client input variables
  },
  serialize(value: ObjectId) {
    return value.toHexString(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value); // value from the client query
    }
    return null;
  },
});

async function bootstrap() {
  try {
    await connectToDB()

    const schema = await buildSchema({
      resolvers: [__dirname + "/resolvers/**/*.{ts,js}"],
      emitSchemaFile: path.resolve(__dirname, "generated/schema.graphql"),
      globalMiddlewares: [TypegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }, { type: Date, scalar: GraphQLDateTime }],
      validate: false,

    })

    // Create GraphQL server
    const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) });

    // Start the server
    const { url } = await server.listen(PORT || 4000);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
  }
  catch (err) {
    console.error(err);
  }
}

bootstrap()
