import mongoose, { Document, Schema } from "mongoose";
export interface IKids {
  age: number;
  category: string;
  name: string;
  userID: string;
}
export interface IKidsDocument extends IKids, Document {}
export const KidsSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  userID: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export default mongoose.model<IKidsDocument>("kids", KidsSchema);
