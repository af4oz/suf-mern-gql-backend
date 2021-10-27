import mongoose from 'mongoose';
import { MONGODB_URI } from './config';


const connectToDb = async () => {
  if (!MONGODB_URI) {
    throw new Error('please provide MONGODB_URI')
  }
  await mongoose.connect(MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }).catch(error => console.error(error));;
}

const dropTestDb = async () => {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.connection.db.dropDatabase().catch(error => console.error(error));;
  }
}

const closeDbConnection = async () => {
  await mongoose.connection.close().catch(error => console.error(error));;
}


// let server: ApolloServer;
// createSchema().then((schema) => {
//   const server = new ApolloServer({ schema, context: ({ req }) => ({ req }) })
//   return new Promise<ApolloServer>((resolve, reject) => {
//     if (server) {
//       resolve(server);
//     }
//     else {
//       reject('Something went wrong!')
//     }
//   })
// }).then((res) => {
//   server = res;
// })

export {
  connectToDb,
  dropTestDb,
  closeDbConnection,
}