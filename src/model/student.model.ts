import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  token: {type: String},
  result: {type : Number}
});

export interface Student extends mongoose.Document {
  id: string;
  name: string;
  password: string;
  email: string;
  token: string;
  result: number;
}