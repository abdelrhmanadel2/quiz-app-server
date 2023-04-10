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
  createQuizResult,
  getAllQuizResults,
  getQuizResult,
} from "../service/result._service";
import { IQuizResult } from "../models/quiz.model";

export const createQuizResultHandler = async (
  req: Request<{}, {}, IQuizResult>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const input: any = req.body;
    const client = await createQuizResult(input);
    console.log("client:", client);
    res.json({
      status: successStatus("en"),
      message: successStatus("en"),
      data: client,
    });
  } catch (err) {
    // mongoose.connection.close();
    res.send(err);
  }
};
export const getAllQuizResultsHandler = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const result = await getAllQuizResults(req.query.id);
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
export const getQuizResultHandler = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const result = await getQuizResult(req.query.id);
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
