import mongoose from 'mongoose';
import { MONGODB_URI as url } from './utils/config';

const connectToDB = async () => {
  if (!url) throw new Error('Provide valid Mongodb Url!');
  try {
    await mongoose.connect(url);

    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(`Error while connecting to MongoDB: `, error);
  }
};

export default connectToDB;
