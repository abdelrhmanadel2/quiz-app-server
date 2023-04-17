import {
  dublication,
  failedStatus,
  notFound,
} from "../utils/helpers/server.local";
import mongoose, { DocumentDefinition } from "mongoose";
import QuestionModel, {
  IQuestion,
  IQuestionDocument,
} from "../models/questions.model";
import CurrentQuizModel, {
  ICurrentQuiz,
  ICurrentQuizDocument,
} from "../models/kid_current_quiz";
import { getFolderContent } from "../utils/helpers/functions.helper";
import { errorThrower } from "../utils/helpers/error.handellar.helper";

export async function createQuestion(
  input: DocumentDefinition<IQuestionDocument>
) {
  try {
    let question = await QuestionModel.create(input);
    return question;
  } catch (error) {
    throw error;
  }
}
export async function createManyQuestion(input: Array<IQuestion>) {
  try {
    let question = await QuestionModel.create(input);
    return question;
  } catch (error) {
    throw Error(dublication("en", ""));
  }
}

export async function getQuestion(id: string) {
  try {
    return await QuestionModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function getAllQuestions() {
  try {
    return await QuestionModel.find({});
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function getLevelQuestions(input: {
  category: string;
  level: number;
  count: number;
  percentage: number;
}) {
  console.log("input  ", input);
  var mathResult: Array<IQuestion>;
  var logicResult: Array<IQuestion>;
  let level = input.level;
  let percentage = input.percentage;
  let mathSize = input.count * percentage;
  let logicSize = input.count * (1 - percentage);
  try {
    mathResult = await QuestionModel.aggregate([
      { $match: { level: level, category: input.category, tag: "Math" } },
      { $sample: { size: mathSize } },
    ]);
    logicResult = await QuestionModel.aggregate([
      { $match: { level: level, category: input.category, tag: "Logic" } },
      { $sample: { size: logicSize } },
    ]);
    let result = [...logicResult, ...mathResult].sort(
      () => Math.random() - 0.5
    );
    console.log("mathSize ", mathSize);
    console.log("logicSize ", logicSize);
    console.log("result ", result.length);
    for await (const element of result) {
      // console.log(element.folderPath);
      let imgs = await getFolderContent("en", element.folderPath);
      if (imgs) {
        let question = imgs.filter((e) =>
          e.name?.toLowerCase()?.includes("quiz")
        );
        if (question) element.questionImg = question[0].url;

        element.options = imgs.filter(
          (e) => !e.name?.toLowerCase()?.includes("quiz")
        );
        // console.log(element.options);
      }
    }
    return result;
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function setQuestionsUrl() {
  try {
    let result = await QuestionModel.find({});

    for await (const element of result) {
      // console.log(element.folderPath);
      let imgs = await getFolderContent("en", element.folderPath);
      if (imgs) {
        let question = imgs.filter((e) =>
          e.name?.toLowerCase()?.includes("quiz")
        );
        if (question) element.questionImg = question[0].url;

        element.options = imgs.filter(
          (e) => !e.name?.toLowerCase()?.includes("quiz")
        );
        // console.log(element.options);
      }
      // await QuestionModel.updateOne(
      //   { _id: element._id },
      //   {
      //     ...element,
      //   }
      // );
    }
    return result;
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function addCurrentQuiz(
  input: DocumentDefinition<ICurrentQuizDocument>
) {
  try {
    let result = await CurrentQuizModel.updateOne(
      { kidId: input.kidId },
      input,
      {
        upsert: true,
        setDefaultsOnInsert: true,
        new: true,
      }
    );

    return result;
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function getCurrentQuiz(kidId: string) {
  try {
    let result = await CurrentQuizModel.findOne({
      kidId: new mongoose.Types.ObjectId(kidId),
    });

    return result;
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
export async function deleteCurrentQuiz(kidId: string) {
  try {
    let result = await CurrentQuizModel.deleteOne({
      kidId: new mongoose.Types.ObjectId(kidId),
    });

    return result;
  } catch (error) {
    throw Error(notFound("en", ""));
  }
}
