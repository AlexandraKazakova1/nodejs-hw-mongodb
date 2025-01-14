import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
  try {
    const user = getEnvVar(process.env.MONGODB_USER);
    const pwd = getEnvVar(process.env.MONGODB_PASSWORD);
    const url = getEnvVar(process.env.MONGODB_URL);
    const db = getEnvVar(process.env.MONGODB_DB);

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    console.log('Mongo connection successfully established!');
  } catch (e) {
    console.log('Error while setting up mongo connection', e);
    throw e;
  }
};
