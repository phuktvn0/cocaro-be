import mongoose, { Schema, model, ObjectId } from 'mongoose';

interface dataUser {
  _id: ObjectId;
  password: string;
  name: string;
  wins: number;
  losses: number;
  level: number;
  gamesId: ObjectId[];
}

//Create schema
const userSchema = new Schema<dataUser>(
  {
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    level: { type: Number, required: true },
    gamesId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
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
