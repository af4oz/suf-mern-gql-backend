# Stack Underflow | Backend
An attempt at building a Backend for Stackoverflow clone using type-graphql, mongoose, and others.

## How to run this program?

You can choose either **one** of the below setup procedures:

#### Codesandbox Setup

- **Step 1:**

  [![Edit af4oz/suf-mern-gql-backend/main](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/af4oz/suf-mern-gql-backend/main?embed=1)

  Wait for VM bootup process....

- **Step 2:** Create a local branch on your codesandbox account.

- **Step 3:**  
  Run `yarn server start:dev`

#### Local setup

**Please Note:** I have already loaded `.env.dev` file with required variables, But be sure to check [packages/server/env.example](./packages//server/env.example) and add required `.env.dev or .env.test` files in [packages/server](./packages/server/) directory if something goes wrong. Run the commands in below <ins>order</ins> from [project root directory](./).

```sh
# Install Dependencies
yarn install

# Check Environment variables

# Start MongoDB
yarn server start:mongo # check `packages/server/docker-compose.yml` for more information

# Build App
yarn server build

# Start Development Server
yarn server start:dev # development server runs with `.env.dev` variables
# or
yarn server start:test # test server runs with `.env.test` variables

# Cleanup: Kill MongoDB Process
yarn server kill:mongo
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
