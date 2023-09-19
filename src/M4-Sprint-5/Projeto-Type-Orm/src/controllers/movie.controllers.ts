import { Request, Response } from "express";
import { Movie } from "../entities";
import { movieServices } from "../services";
import { MovieUpdate, Pagination } from "../interfaces";

const createNewMovieController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const movie: Movie = await movieServices.createNewMovieService(request.body);

  return response.status(201).json(movie);
};

const getAllMoviesController = async (request: Request, response: Response): Promise<Response> => {
  const pagination = response.locals.pagination;
  const paginationMovies: Pagination = await movieServices.getAllMoviesService(pagination);
  return response.status(200).json(paginationMovies);
};

const updateMovieController = async (request: Request, response: Response): Promise<Response> => {
  const payload: MovieUpdate = request.body;
  const foundMovie: Movie = response.locals.movie;

  const movie: Movie = await movieServices.updateMovieService(foundMovie, payload);

  return response.status(200).json(movie);
};

const deleteMovieController = async (request: Request, response: Response): Promise<Response> => {
  await movieServices.deleteMovieService(response.locals.movie);

  return response.status(204).json();
};

export default {
  createNewMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController,
};
