import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { MovieCreate, MovieRepo, MovieUpdate, Pagination, PaginationParams } from "../interfaces";

const createNewMovieService = async (payload: MovieCreate): Promise<Movie> => {
  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  const movie: Movie = await repo.save(payload);

  return movie;
};

const getAllMoviesService = async ({
  page,
  perPage,
  order,
  sort,
  prevPage,
  nextPage,
}: PaginationParams): Promise<Pagination> => {
  const movieRepo: MovieRepo = AppDataSource.getRepository(Movie);

  const [movies, count]: [Array<Movie>, number] = await movieRepo.findAndCount({
    order: { [sort]: order },
    skip: page,
    take: perPage,
  });

  if (count - page <= perPage) {
    nextPage = null;
  }

  return {
    prevPage,
    nextPage,
    count,
    data: movies,
  };
};

const updateMovieService = async (movie: Movie, payload: MovieUpdate): Promise<Movie> => {
  const repo: MovieRepo = AppDataSource.getRepository(Movie);

  return await repo.save({ ...movie, ...payload });
};

const deleteMovieService = async (movie: Movie): Promise<void> => {
  const repo: MovieRepo = AppDataSource.getRepository(Movie);
  await repo.remove(movie);
};

export default {
  createNewMovieService,
  getAllMoviesService,
  updateMovieService,
  deleteMovieService,
};
