import { connectToCluster } from "../database/connect_to.db";
import {
  successStatus,
  failedStatus,
  dublication,
  notFound,
  addSuccess,
} from "../utils/helpers/server.local";
import { Response, Request, NextFunction } from "express";
import config from "../config/config";
import {
  createManyQuestion,
  createQuestion,
  getAllQuestions,
  getLevelQuestions,
} from "../service/quiz._service";
import { IQuestion } from "../models/questions.model";
import { getAllDirectories } from "../utils/helpers/functions.helper";

export const createQuestionHandler = async (
  req: Request<{}, {}, IQuestion>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const input: any = req.body;
    const result = await createQuestion(input);
    console.log("result:", result);
    res.json({
      status: successStatus("en"),
      message: successStatus("en"),
      data: result,
    });
  } catch (err) {
    // mongoose.connection.close();
    res.send(err);
  }
};

export const createAllQuestionHandler = async (
  req: Request<{}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    let result;
    connectToCluster(config.dataBaseUrl);
    let questionList: Array<IQuestion> = [];
    getAllDirectories(
      "temp/Quistions",
      async function (err: any, files: Array<any>) {
        if (err) {
          console.log("Error", err);
        } else {
          for await (const filePath of files) {
            if (!filePath.includes(".") && filePath.includes("Q_")) {
              let quesion: IQuestion = {
                category: filePath.includes("kids") ? "kids" : "adult",
                level: filePath.includes("level_1")
                  ? 1
                  : filePath.includes("level_2")
                  ? 2
                  : 3,
                ask: "Choose Right Answer?",
                questionText: "",
                tag: filePath.includes("Math") ? "Math" : "Logic",
                folderPath: `${"Quiz"}${filePath.split("temp/Quistions")[1]}`,
              };
              questionList.push(quesion);
            }
          }
          try {
            result = await createManyQuestion(questionList);
            res.json({
              status: successStatus("en"),
              message: successStatus("en"),
              data: result,
            });
          } catch (error) {
            res.send(error);
          }
        }
      }
    );
  } catch (err) {
    console.log("errrrrrrrrrrrrrrrrrrrrr:", err);

    // mongoose.connection.close();
    res.send(err);
  }
};
export const getAllQuestionsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const results = await getAllQuestions();
    res.json({
      status: successStatus("en"),
      message: successStatus("en"),
      data: results,
    });
  } catch (err) {
    // mongoose.connection.close();
    res.send(err);
  }
};
export const getLevelQuestionsHandler = async (
  req: Request<
    {},
    {},
    { category: string; level: number; count: number; percentage: number }
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const results = await getLevelQuestions(req.body);
    res.json({
      status: successStatus("en"),
      message: successStatus("en"),
      data: results,
    });
  } catch (err) {
    // mongoose.connection.close();
    res.send(err);
  }
};
