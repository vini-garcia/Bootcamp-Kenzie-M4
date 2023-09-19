import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";
import { IMovie } from "./interfaces";

const verifyIfNameExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { name } = request.body;

  const queryString: string = `
        SELECT *
        FROM movies
        WHERE name = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [name],
  };

  const queryResult: QueryResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    return response.status(409).json({
      error: "Movie name already exists!",
    });
  }

  return next();
};

const verifyIfIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(request.params.id);
  const queryString: string = `
        SELECT *
        FROM movies
        WHERE id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: QueryResult<IMovie> = await client.query(queryConfig);

  const movie: IMovie = queryResult.rows[0];

  if (!movie) {
    return response.status(404).json({
      error: "Movie not found!",
    });
  }

  response.locals = {
    ...response.locals,
    foundMovie: movie,
  };

  return next();
};

export { verifyIfIdExists, verifyIfNameExists };
