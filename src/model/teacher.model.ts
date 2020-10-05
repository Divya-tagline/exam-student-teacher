import * as mongoose from 'mongoose';

export const TeacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  token: {type: String}
});

export interface Teacher extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  token: string;
}