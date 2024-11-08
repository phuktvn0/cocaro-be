import { Schema, model, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import { number } from 'joi';

interface dataUser {
  email: string;
  password: string;
  _id: ObjectId;
  name: string;
  // isAdmin: boolean;
  wins: number;
  losses: number;
  level: number;
}

//Create schema
const userSchema = new Schema<dataUser>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    level: { type: Number, required: true },
    // isAdmin: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  delete user.password;
  return user;
};

const User = model<dataUser>('User', userSchema);

export default User;
