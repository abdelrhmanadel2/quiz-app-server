import { successStatus } from "../utils/helpers/server.local";
import { connectToCluster } from "../database/connect_to.db";
import { Response, Request, NextFunction } from "express";
import config from "../config/config";
import {
  getFolderContent,
  uploadMultiFilesToCloud,
} from "../utils/helpers/functions.helper";
export const getFolderContenHandler = async (
  req: Request<{}, {}, {}, { bath: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    // // // make req

    const file = await getFolderContent("ar", req.query.bath);
    res.json({
      status: successStatus("ar"),
      message: successStatus("ar"),
      data: file,
    });
  } catch (err) {
    console.log("erre ", err);
    // mongoose.connection.close();
    next(err);
  }
};

export const uploadFolderToCloudHandler = async (
  req: Request<{}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    // add validation here
    // connectToCluster(config.dataBaseUrl);
    // // // make req

    const file = await uploadMultiFilesToCloud("Quiz", "temp/Quistions", "ar");

    res.json({
      status: successStatus("ar"),
      message: successStatus("ar"),
      data: file,
    });
  } catch (err) {
    console.log("erre ", err);
    // mongoose.connection.close();
    next(err);
  }
};
