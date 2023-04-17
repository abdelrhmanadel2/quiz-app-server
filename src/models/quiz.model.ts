import mongoose, { Document, Schema } from "mongoose";
export interface IQuizResult {
  accountId: mongoose.Types.ObjectId;
  iq: number;
  mentalAge: number;
  logicCount: number;
  mathCount: number;
  correctCount?: number;
  questionsCount?: number;
}
export interface IQuizResultDocument extends IQuizResult, Document {}
export const ResultSchema: Schema = new Schema({
  accountId: {
    type: mongoose.Types.ObjectId,
    ref: "kids",
    required: true,
  },
  iq: {
    type: Number,
  },
  mentalAge: {
    type: Number,
  },
  logicCount: {
    type: Number,
  },
  mathCount: {
    type: Number,
  },
  correctCount: {
    type: Number,
  },
  questionsCount: {
    type: Number,
  },
});

// ResultSchema.index({ userName: 1 }, { unique: true });

export default mongoose.model<IQuizResultDocument>("userquiz", ResultSchema);
