import { QueryResult } from "pg";

interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}

type TMovieCreate = Omit<IMovie, "id">;

type TMovieUpdate = Partial<TMovieCreate>;

type MovieResult = QueryResult<IMovie>

export { IMovie, TMovieCreate, TMovieUpdate, MovieResult };
