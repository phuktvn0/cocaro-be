import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

let mongoDb: MongoMemoryServer;
const MONGODB_URI: string =
  process.env.MONGO_URI ||
  'mongodb+srv://phuktvn0:Qq123213@phuktvn0.xwgmvjg.mongodb.net/cocaro';

export const connect = async () => {
  let uri = MONGODB_URI;
  if (process.env.NODE_ENV === 'test') {
    mongoDb = await MongoMemoryServer.create();
    uri = mongoDb.getUri();
  }

  await mongoose
    .connect(uri)
    .then(() => console.log(`DB connected ${uri}`))
    .catch((err) => console.log(err));
};

export const disconnect = async () => {
  await mongoose.disconnect();
  if (mongoDb) {
    await mongoDb.stop();
  }
};

export function getCurrentDate() {
  return new Date();
}

const secretkey = process.env.JWT_SECRET_KEY || 'phuktvn';

const generateToken = (id) => {
  return jwt.sign({ id }, secretkey, {
    expiresIn: '30d',
  });
};

export default generateToken;
