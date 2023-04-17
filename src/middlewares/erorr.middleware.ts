import { Request, Response, NextFunction } from "express";
import Error from "../interfaces/error.interface";

export default errorMiddleware;

function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("error:", err.message);
  if (err.name === "ValidationError") {
    // mongoose validation error
    return res.status(400).json({ status: 400, message: err.message });
  }
  const status = err.status || 500;
  const message = err.message || "Whoops!! something went wrong";
  // default to 500 server error
  return res.status(status).json({ status, message });
}
