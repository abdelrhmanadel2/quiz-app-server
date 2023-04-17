import mongoose, { DocumentDefinition } from "mongoose";

import kidsModel, { IKids, IKidsDocument } from "../models/kids.model";
import { notFound } from "../utils/helpers/server.local";

export async function createKidData(
  input: DocumentDefinition<IKidsDocument>,
  locale: string
) {
  try {
    return await kidsModel.create(input);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getParentKids(userId: string) {
  try {
    return await kidsModel.find({
      userID: new mongoose.Types.ObjectId(userId),
    });
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function getKid(userId: string) {
  try {
    return await kidsModel.findOne({
      userID: new mongoose.Types.ObjectId(userId),
    });
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
