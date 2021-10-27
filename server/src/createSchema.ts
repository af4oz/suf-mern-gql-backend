import path from 'path';
import { buildSchema } from 'type-graphql'
import { TypegooseMiddleware } from './middlewares/typegoose';
import { GraphQLDateTime } from 'graphql-iso-date'
import { ObjectId } from 'mongodb'

import { GraphQLScalarType, Kind } from "graphql";

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


export const createSchema = async () => {

  const schema = await buildSchema({
    resolvers: [__dirname + "/resolvers/**/*.{ts,js}"],
    emitSchemaFile: path.resolve(__dirname, "generated/schema.graphql"),
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }, { type: Date, scalar: GraphQLDateTime }],
    validate: false,

  })

  return schema;
}