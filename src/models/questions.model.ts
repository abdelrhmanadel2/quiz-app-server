import mongoose, { Document, Schema } from "mongoose";
import { AnswerType } from "../types/files.type";
export interface IQuestion {
  level: number;
  category: string;
  tag?: string;
  ask?: string;
  questionText?: string;
  questionImg?: string;
  folderPath: string;
  options?: Array<AnswerType>;
}
export interface IQuestionDocument extends IQuestion, Document {}
export const QuestionsSchema: Schema = new Schema({
  level: { type: Number, required: true },
  questionImg: { type: String },
  questionText: { type: String },
  folderPath: { type: String },
  options: { type: Array },
  ask: { type: String },
  category: {
    type: String,
  },
  tag: {
    type: String,
  },
  // answer: {
  //   type: Number,
  //   required: true,
  // },
});

QuestionsSchema.index(
  { level: 1, folderPath: 1, category: 1, tag: 1 },
  { unique: true }
);

export default mongoose.model<IQuestionDocument>("questions", QuestionsSchema);
