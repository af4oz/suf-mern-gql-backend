# Stack Underflow | SOF Clone | MERN-GraphQL

**Update 1:** This project is a fork from [amand33p](https://github.com/amand33p). I have been making some efforts to replace `material-ui` with `twin.macro` just to learn react, CSS and make reusable components myself. It's been a great journey so far and I learned a lot from `material-ui`, they did solid work with their lib and also used a tonne of `useRef` 😅 to opt-out of react default rendering behaviour.

**Update 2:** Migrated Server codebase to **Typescript** using `type-graphql`, `typegoose`.

**Update 3:** Migrated Client codebase to **Typescript** using `graphql`, `@graphql-codegen` 💚 ,`definitelyTyped` libs.

**Update 4: (27/10/2021)** Automated Graphql Testing using `jest`, `ts-jest`, `isomorphic-fetch`.

**Update 5: (29/10/2021)** Replaced constant growing arrays with mongoose virtuals.

**Update 6: (4/05/2022)** Moving to Hybrid(poly repo + mono repo) structure to reduce code,build management issues, also I am not using tools like Nx,turborepo,bazel which would mitigate those issues.

## Future

1. <strike>Automate Graphql Testing</strike> ✔️
2. <strike>Replace constant growing arrays in schema as mongoose document sizelimit is **16MB** </strike>. ✔️
3. Use transactions in mutation resolvers which involves multiple mutating db requests.

## Usage

#### Env variable:

Create a .env file in server directory and add the following:

```
MONGODB_URI = "Your Mongo URI"
PORT = 4000
JWT_SECRET = "Your JWT secret"

```

#### Server:

```
yarn install
yarn server dev
```

Fullstack [Stack Overflow](https://stackoverflow.com/) clone (QnA site) made with MERN + GraphQL

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

## Features

- Authentication (login/register with username-password)
- CRUD questions, answers & comments
- Upvote/downvote questions & answers
- Tags for organising questions
- Page views - A view is registered whenever the question page is opened
- Pages for added tags, registered users & more
- Sorting of questions on basis of hot, votes, views, newest & oldest
- Search questions over the server on basis of question title & body
- Pagination of posts in the form of "Load More" button
- Error management to prevent app crashes
- Toast notifications for actions: adding questions, deleting comments etc.
- Loading spinners for relevant fetching processes
- Formatted dates for adding/updating questions/answers/comments
- <strike>Dark mode toggle w/ local storage save</strike>
- Proper responsive UI for all screens
