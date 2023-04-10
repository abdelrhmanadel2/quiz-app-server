import {
  dublication,
  failedStatus,
  notFound,
} from "../utils/helpers/server.local";
import mongoose, { DocumentDefinition } from "mongoose";
import QuizResultModel, { IQuizResultDocument } from "../models/quiz.model";

export async function createQuizResult(
  input: DocumentDefinition<IQuizResultDocument>
) {
  try {
    let result = await QuizResultModel.create(input);
    return result;
  } catch (error) {
    throw error;
  }
}
export async function getQuizResult(id: string) {
  try {
    return await QuizResultModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function getAllQuizResults(user: string) {
  try {
    return await QuizResultModel.find({
      accountId: new mongoose.Types.ObjectId(user),
    });
  } catch (error) {
    throw error;
  }
}
