# Stack Underflow | SOF Clone | MERN-GraphQL

**Update 1:** This project is a fork from [amand33p](https://github.com/amand33p). I have been making some efforts to replace `material-ui` with `twin.macro` just to learn react, CSS and make reusable components myself. It's been a great journey so far and I learned a lot from `material-ui`, they did solid work with their lib and also used a tonne of `useRef` 😅 to opt-out of react default rendering  behaviour.

**Update 2:** Migrated Server codebase to **Typescript** using `type-graphql`, `typegoose`.

**Update 3:** Migrated Client codebase to **Typescript** using `graphql`, `@graphql-codegen` 💚 ,`definitelyTyped` libs.

## Future
1. Replace constant growing arrays in schema as mongoose document sizelimit is **16MB**.
2. Use transactions in mutation resolvers which involves multiple db operations.
3. Add Dark Mode.

## Usage

#### Env variable:

Create a .env file in server directory and add the following:

```
MONGODB_URI = "Your Mongo URI"
PORT = 4000
SECRET = "Your JWT secret"

```

#### Client:

Open client/src/backendUrl.js & change "backend" variable to `"http://localhost:4000"`

```
cd client
npm install
npm start
```

#### Server:

Note: Make sure that you have installed 'nodemon' as global package.

```
cd server
npm install
npm run dev
```

Fullstack [Stack Overflow](https://stackoverflow.com/) clone (QnA site) made with MERN + GraphQL

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Apollo Client](https://www.apollographql.com/docs/react/) - State management library to manage both local and remote data with GraphQL
- [Context API w/ hooks](https://reactjs.org/docs/context.html) - For state of user, toast notifs, theme etc.
- [React Router](https://reactrouter.com/) - For general routing & navigation
- [React Hook Form](https://react-hook-form.com/) - For flexible forms
- ~~[Material-UI w/ lots of CSS customisations](https://material-ui.com/)~~ now using [twin.macro](https://github.com/ben-rogerson/twin.macro)- CSS-in-JS library
- [Yup](https://github.com/jquense/yup) - For form validation
- [date-fns](https://date-fns.org/) - For manipulating & formatting of dates

#### Back-end

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
- Dark mode toggle w/ local storage save
- Proper responsive UI for all screens

## Screenshots

#### Desktop/Tablet

![Desktop-1](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/desktop-1.jpg)
![Desktop-2](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/desktop-2.jpg)
![Desktop-3](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/desktop-3.jpg)
![Desktop-4](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/desktop-4.jpg)
![Desktop-5](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/desktop-5.jpg)

#### Mobile

![Mobile-1](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/mobile-1.jpg)
![Mobile-2](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/mobile-2.jpg)
![Mobile-3](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/mobile-3.jpg)
![Mobile-4](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/mobile-4.jpg)
![Mobile-5](https://github.com/amand33p/stack-underflow-mern-gql/blob/master/screenshots/mobile-5.jpg)

