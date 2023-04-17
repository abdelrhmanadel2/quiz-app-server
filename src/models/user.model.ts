import mongoose, { Document, Schema } from "mongoose";
export interface IUser {
  type: string;
  name: string;
  email: string;
  password?: string;
}
export interface IUserDocument extends IUser, Document {}
export const UserSchema: Schema = new Schema({
  name: { type: String, trim: true },
  password: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  // did or parent
  type: {
    type: String,
  },
});

UserSchema.index({ email: 1 }, { unique: true });

export default mongoose.model<IUserDocument>("users", UserSchema);
