import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  usertype: { type: String , required: true},
  email: { type: String },
  token: { type: String },
  result: { type: Number },
});

export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  usertype: string;
  email: string;
  token: string;
  result: number;
}
