import mongoose, { Document, Schema } from "mongoose";
export interface IUser {
  age: number;
  category: string;
  name: string;
  userName: string;
  password?: string;
}
export interface IUserDocument extends IUser, Document {}
export const UserSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String },
  category: {
    type: String,
  },
  age: {
    type: Number,
    // required: true,
  },
});

UserSchema.index({ userName: 1 }, { unique: true });

export default mongoose.model<IUserDocument>("users", UserSchema);
