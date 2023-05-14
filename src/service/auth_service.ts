import bcrypt from "bcryptjs";
import UserModel, { IUserDocument, IUser } from "../models/user.model";
import {
  successStatus,
  failedStatus,
  dublication,
  notFound,
} from "../utils/helpers/server.local";
import kidsModel, { IKids, IKidsDocument } from "../models/kids.model";

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
      throw Error("لايوجد حساب مسجل على هذا الايميل قم بالتسجيل  ");
      //No Account With This email Try To Register Frist
    }
    let isValidPassword = bcrypt.compareSync(input.password, user.password!);
    if (isValidPassword) {
      return user;
    }
    throw Error("كلمة المرور خاطئه");
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

export async function deleteUser(id: string, locale: string) {
  try {
    await UserModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
    await kidsModel.deleteMany({ UserID: new mongoose.Types.ObjectId(id) });
  } catch (error) {
    throw error;
  }
}

export async function getAllUser(locale: string) {
  try {
    return await UserModel.find({ type: { $ne: "admin" } });
  } catch (error) {
    throw error;
  }
}
// added
export async function updateUserName(id: string, name: string, locale: string) {
  try {
    let user = await UserModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          name: name,
        },
      },
      { new: true }
    );
    if (user != null) {
      user.type == "kids";
      await kidsModel.findOneAndUpdate(
        {
          UserID: new mongoose.Types.ObjectId(id),
        },
        {
          $set: {
            name: name,
          },
        }
      );
      return user;
    }
  } catch (error) {
    throw error;
  }
}
