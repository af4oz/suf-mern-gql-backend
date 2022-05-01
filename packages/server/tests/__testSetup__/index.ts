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


export {
  connectToDb,
  dropTestDb,
  closeDbConnection,
}
