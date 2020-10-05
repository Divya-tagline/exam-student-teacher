import { ObjectID } from "mongodb";
import * as mongoose from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  option: { type: Object, required: true },
  answer: { type: String, required: true },
  sub_id: { type: ObjectID, required: true }
});

export interface Question extends mongoose.Document {
  id: string;
  name: string;
  option: any;
  answer: string;
  sub_id: ObjectID;
}
