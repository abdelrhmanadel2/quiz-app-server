import bcrypt from "bcryptjs";
import UserModel, { IUserDocument, IUser } from "../models/user.model";
import {
  successStatus,
  failedStatus,
  dublication,
  notFound,
} from "../utils/helpers/server.local";

import mongoose, { DocumentDefinition } from "mongoose";

export async function userRegister(
  input: DocumentDefinition<IUserDocument>,
  locale: string
) {
  try {
    return await UserModel.create(input);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function authenticateUser(
  input: { email: string; password: string },
  locale: string
) {
  try {
    console.log("input", input);
    let user = await UserModel.findOne({
      email: input.email,
      // password: input.password
    });
    if (!user) {
      throw Error("No Account With This email Try To Register Frist");
    }
    let isValidPassword = bcrypt.compareSync(input.password, user.password!);
    if (isValidPassword) {
      return user;
    }
    throw Error("Wrong Password");
  } catch (error) {
    throw error;
  }
}

export async function getUser(id: string, locale: string) {
  try {
    return await UserModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
  } catch (error) {
    throw error;
  }
}
