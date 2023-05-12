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
import { createKidData, getKid, getParentKids } from "../service/kids_service";
import config from "../config/config";
import bcrypt from "bcryptjs";

import {
  userRegister,
  getUser,deleteUser,
  authenticateUser,getAllUser,
} from "../service/auth_service";
import { IKids } from "../models/kids.model";
export const userRegisterInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // // make req
    const input = req.body;
    console.log("input body ", req.body);
    console.log("input qy=uery ", req.query);
    console.log("input params ", req.params);
    // add validation here
    await connectToCluster(config.dataBaseUrl);
    let newpassword = bcrypt.hashSync(input.password, 10);
    input.password = newpassword;

    // add user  data and id

    const userInfo = await userRegister(input, "ar");
    if (input.type == "kids") {
      let kidInput: IKids = req.body;
      kidInput.userID = userInfo._id;
      kidInput.category = input.age <= 10 ? "baby" : "young";
      const kid = await createKidData(kidInput, "ar");
    }
    res.json({
      status: successStatus("ar"),
      message: addSuccess("ar", ["معلومات الحساب", "Account Info"]),
      data: userInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};

export const logInHandler = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("query ", req.query);
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let userInfo = await authenticateUser(req.body, "ar");
    res.json({
      status: successStatus("ar"),
      message: "user authenticated successfully",
      //user authenticated successfully
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
    let userInfo = await getUser(req.query.id, "ar");
    res.json({
      status: successStatus("ar"),
      message: "user authenticated successfully",
      data: userInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
export const getKidHandler = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let userInfo = await getKid(req.query.id);
    res.json({
      status: successStatus("ar"),
      message: "user authenticated successfully",
      data: userInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
export const getParentKidsHandler = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let kids = await getParentKids(req.query.id);
    res.json({
      status: successStatus("ar"),
      data: kids,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
export const deleteParentKidsHandler = async (
  req: Request<{}, {}, {}, { id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let kids = await deleteUser(req.query.id,"ar");
    res.json({
      status: successStatus("ar"),
      data: kids,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
export const parentAddKidHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // // make req
    const input = req.body;
    console.log("input body ", req.body);
    console.log("input qy=uery ", req.query);
    console.log("input params ", req.params);
    // add validation here
    await connectToCluster(config.dataBaseUrl);
    let kid;

    if (input.userID) {
      let kidInput: IKids = req.body;
      kidInput.category = input.age < 10 ? "baby" : "young";
      kid = await createKidData(kidInput, "ar");
    }
    res.json({
      status: successStatus("ar"),
      message: addSuccess("ar", ["طفل", "Account Info"]),
      data: kid,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};
export const getAllUsersHandler = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    connectToCluster(config.dataBaseUrl);
    // // make req
    let usersInfo = await getAllUser("en");
    res.json({
      status: successStatus("en"),
      // message: "user deleted successfully",
      data: usersInfo,
    });
  } catch (err) {
    // mongoose.connection.close();
    next(err);
  }
};