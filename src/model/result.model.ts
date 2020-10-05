import { ObjectID } from "mongodb";
import * as mongoose from "mongoose";

export const ResultSchema = new mongoose.Schema({
  s_id: { type: ObjectID, required: true },
  result: { type: Number, required: true },
  sub_id: { type: ObjectID, required: true },
  persantage: { type: Number, required: true },
});

export interface Result extends mongoose.Document {
  id: string;
  s_id: ObjectID;
  result: number;
  sub_id: ObjectID;
  persantage: number;
}
