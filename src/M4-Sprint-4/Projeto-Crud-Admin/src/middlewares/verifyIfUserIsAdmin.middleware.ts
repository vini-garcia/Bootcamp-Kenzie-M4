import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";

const verifyIfUserIsAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin: boolean = response.locals.admin;

  if (!admin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default verifyIfUserIsAdmin;
