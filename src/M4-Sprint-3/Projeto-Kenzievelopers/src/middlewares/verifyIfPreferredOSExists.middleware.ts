import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyIfPreferredOSExists = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const preferredOS: string = req.body.preferredOS;

  if (preferredOS === "Windows" || preferredOS === "Linux" || preferredOS === "MacOS") {
    return next();
  }

  const message: string = "Invalid OS option.";
  throw new AppError(message, 400);
};

export default verifyIfPreferredOSExists;
