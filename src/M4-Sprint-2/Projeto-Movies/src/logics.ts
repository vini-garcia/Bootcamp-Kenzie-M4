import { Request, Response } from "express";
import { IMovie, MovieResult, TMovieCreate } from "./interfaces";
import { QueryConfig } from "pg";
import { client } from "./database";
import format from "pg-format";

const createNewMovie = async (request: Request, response: Response): Promise<Response> => {
  const payload: TMovieCreate = request.body;

  const queryFormat: string = format(
    `
  INSERT INTO "movies" (%I) VALUES (%L) RETURNING *;`,
    Object.keys(payload),
    Object.values(payload)
  );

  const QueryResult: MovieResult = await client.query(queryFormat);
  const movie: IMovie = QueryResult.rows[0];

  return response.status(201).json(movie);
};

const getMovies = async (request: Request, response: Response): Promise<Response> => {
  const category: any | undefined = request.query.category;

  if (category?.length > 0) {
    const queryString: string = `
      SELECT *
      FROM movies
      WHERE category = $1;
    `;

    const queryConfig: QueryConfig = {
      text: queryString,
      values: [category],
    };

    const queryResult: MovieResult = await client.query(queryConfig);
    const movies: IMovie[] = queryResult.rows;

    if (movies?.length === 0) {
      const queryString: string = `
        SELECT *
        FROM movies;
    `;

      const queryResult: MovieResult = await client.query(queryString);
      const movies: IMovie[] = queryResult.rows;

      return response.status(200).json(movies);
    }

    return response.status(200).json(movies);
  }

  const queryString: string = `
    SELECT *
    FROM movies;
  `;

  const queryResult: MovieResult = await client.query(queryString);
  const movies: IMovie[] = queryResult.rows;

  return response.status(200).json(movies);
};

const getMovieById = async (request: Request, response: Response): Promise<Response> => {
  const movie: IMovie = response.locals.foundMovie;

  return response.status(200).json(movie);
};

const updateMovie = async (request: Request, response: Response): Promise<Response> => {
  const { body, params } = request;

  const updateColumns: string[] = Object.keys(body);
  const updateValues: string[] = Object.values(body);

  const queryTemplates: string = `
    UPDATE movies
    SET (%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
  `;
  const queryFormat: string = format(queryTemplates, updateColumns, updateValues);

  const queryConfig: QueryConfig = {
    text: queryFormat,
    values: [params.id],
  };

  const queryResult: MovieResult = await client.query(queryConfig);
  const updatedMovie: IMovie = queryResult.rows[0];

  return response.status(200).json(updatedMovie);
};

const deleteMovie = async (request: Request, response: Response): Promise<Response> => {
  const { id } = request.params;

  const queryString: string = `
    DELETE FROM movies
    WHERE id = $1
    RETURNING *;
  `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: MovieResult = await client.query(queryConfig);

  return response.status(204).json();
};

export { createNewMovie, updateMovie, getMovies, getMovieById, deleteMovie };
