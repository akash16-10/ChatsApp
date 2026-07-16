import mongoose from 'mongoose';
import { ENV } from '../utils/env.js';

export const connectDB = async () => {
  try {
    if (!ENV.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    const conn = await mongoose.connect(ENV.MONGO_URI); 
    console.log('MongoDB connected: ', conn.connection.host);
    } catch (error) {
    console.error('Error connecting to MongoDB: ', error.message);
    process.exit(1);
  }
};
