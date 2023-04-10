import { IUser } from "../models/user.model";

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
  userRegister,
  getUser,
  authenticateUser,
} from "../service/auth_service";
export const userRegisterInfoHandler = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    const input: IUser = req.body;

    const tempInfo = await userRegister(input, "en");
    res.json({
      status: successStatus("en"),
      message: addSuccess("en", ["معلومات الحساب", "Account Info"]),
      data: tempInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};

export const logInHandler = async (
  req: Request<{}, {}, { userName: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("query ", req.query);
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let userInfo = await authenticateUser(req.body, "en");
    res.json({
      status: successStatus("en"),
      message: "user authenticated successfully",
      data: userInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
export const getUserHandler = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let userInfo = await getUser(req.query.id, "en");
    res.json({
      status: successStatus("en"),
      message: "user authenticated successfully",
      data: userInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
