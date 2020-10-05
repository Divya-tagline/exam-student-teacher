import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export interface Subject extends mongoose.Document {
  id: string;
  name: string;
}