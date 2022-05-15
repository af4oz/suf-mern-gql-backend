# Stack Underflow | Backend

> Here's [frontend repo](https://github.com/zkindest/suf-mern-gql-frontend)

**TODO:**

1. Use transactions in mutation resolvers which involves multiple mutating db requests.

**Update 1:** Replace `material-ui` with `twin.macro` just to practice react, CSS and make reusable components. It's hard to get it all correct (flexibility, performance etc)

**Update 2:** Migrated Server codebase to **Typescript** using `type-graphql`, `typegoose`.

**Update 3:** Migrated Client codebase to **Typescript** using `graphql`, `@graphql-codegen` 💚 ,`definitelyTyped` libs.

**Update 4: (27/10/2021)** Automated Graphql Testing using `jest`, `ts-jest`, `isomorphic-fetch`.

**Update 5: (29/10/2021)** Replaced constant growing arrays with mongoose virtuals.

**Update 6: (4/05/2022)** Moving to Hybrid(poly repo + mono repo) structure to reduce code,build management issues, also I am not using tools like Nx,turborepo,bazel which would mitigate those issues.

**Update 7:** Improve existing data model.

## Usage

#### Server:

Be sure check `env.example` and provide required `.env` files.

```sh
yarn install
yarn server dev
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
