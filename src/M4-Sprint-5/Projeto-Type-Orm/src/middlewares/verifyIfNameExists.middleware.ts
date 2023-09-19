import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { MovieRepo } from "../interfaces";

const verifyIfNameExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  const name: string = request.body.name;

  if (!name) {
    return next();
  }

  const movieExists: boolean = await repo.exist({ where: { name } });

  if (movieExists) {
    throw new AppError("Movie already exists.", 409);
  }

  return next();
};

export default verifyIfNameExists;
