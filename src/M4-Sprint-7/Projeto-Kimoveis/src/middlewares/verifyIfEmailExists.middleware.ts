import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const verifyIfEmailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const repo = AppDataSource.getRepository(User);
  const email: string = request.body.email;

  if (!email) {
    return next();
  }

  const emailExists: boolean = await repo.exist({ where: { email } });

  if (emailExists) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export default verifyIfEmailExists;
