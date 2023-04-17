import { IQuestionDocument, QuestionsSchema } from "./questions.model";
import { IQuizResultDocument, ResultSchema } from "./quiz.model";
import mongoose, { Document, Schema } from "mongoose";
export interface ICurrentQuiz {
  level: number;
  currentQuestion: number;
  totalResult: IQuizResultDocument;
  levelResult: IQuizResultDocument;
  questions: Array<IQuestionDocument>;
  kidId: string;
}
export interface ICurrentQuizDocument extends ICurrentQuiz, Document {}
export const currentQuizSchema: Schema = new Schema({
  questions: { type: Array<IQuestionDocument>, required: true },
  totalResult: {
    type: ResultSchema,
  },
  levelResult: {
    type: ResultSchema,
  },
  level: {
    type: Number,
    required: true,
  },
  currentQuestion: {
    type: Number,
    required: true,
  },
  kidId: { type: mongoose.Types.ObjectId, ref: "kids", required: true },
});

export default mongoose.model<ICurrentQuizDocument>(
  "currentquiz",
  currentQuizSchema
);
