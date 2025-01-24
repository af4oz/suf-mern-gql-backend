import mongoose from 'mongoose'
import { MONGODB_URI as url } from './utils/config'

const connectToDB = async () => {
  if (!url) throw new Error('Provide valid Mongodb Url!')
  await mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000,
  })

  console.log('Connected to MongoDB!')
}

export default connectToDB
