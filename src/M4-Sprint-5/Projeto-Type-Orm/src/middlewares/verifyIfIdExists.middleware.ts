import { NextFunction, Request, Response } from "express";
import { MovieRepo } from "../interfaces";
import { Movie } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyIfIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const movieId: number = Number(request.params.id);

  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  const movie: Movie | null = await repo.findOneBy({ id: movieId });

  if (!movie) throw new AppError("Movie not found", 404);

  response.locals = { ...response.locals, movie };

  return next();
};

export default verifyIfIdExists;
