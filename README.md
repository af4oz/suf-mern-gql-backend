# Stack Underflow | Backend

This repository contains Back-end code(Apollo-Server, Mongodb, Graphql, etc) of the project, Here's the [frontend repo](https://github.com/af4oz/suf-mern-gql-frontend).

## How to run this program?

#### Server:

Be sure to check `packages/server/env.example` and provide required `.env.dev/.env.test` files in `packages/server` directory. Run the commands in below order from <ins>project root directory</ins>.

```sh
# Install Project deps and build the project
yarn install
yarn server build

# Start a local instance of MongoDB
docker-compose up # check `packages/server/docker-compose.yml` for more information

# Start the server
yarn server start:dev # development server runs with `.env.dev` variables
yarn server start:test # test server runs with `.env.test` variables
```

## Built using

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/) - To build a self-documenting GraphQL API server
- [Type-graphql](https://typegraphql.com/docs/introduction.html) - For defining the Graphql schema using classes and decorators and additional features like dependency injection, validation and auth guards to embrace code reusability
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [Typegoose](https://typegoose.github.io/typegoose/) - Define Mongoose models using TypeScript classes
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Mongoose Unique Validator](https://www.npmjs.com/package/mongoose-unique-validator) - Plugin for better error handling of unique fields within Mongoose schema.
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file
- Docker

## Changelog

**Update 1:** Migrated Server codebase to **Typescript** using `type-graphql`, `typegoose`.

**Update 2: (27/10/2021)** Automated Graphql Testing using `jest`, `ts-jest`, `isomorphic-fetch`.

**Update 3: (29/10/2021)** Replaced constant growing arrays with mongoose virtuals.

**Update 4: (4/05/2022)** Moved to Hybrid(poly repo + mono repo) structure to reduce code,build management issues, also I am not using tools like Nx,turborepo,bazel which would mitigate those issues.

**Update 5:** Improve code and data models.

## TODO

1. Use transactions in mutation resolvers that involve multiple mutating database requests.
