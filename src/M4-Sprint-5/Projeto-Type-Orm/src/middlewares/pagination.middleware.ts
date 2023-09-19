import { NextFunction, Request, Response } from "express";

const pagination = (request: Request, response: Response, next: NextFunction): void => {
  const queryPage: number = Number(request.query.page);
  const queryPerPage: number = Number(request.query.perPage);

  const page: number = queryPage && queryPage > 1 ? queryPage : 1;
  const perPage: number = queryPerPage && queryPerPage <= 5 && queryPerPage > 0 ? queryPerPage : 5;

  const baseUrl: string = `http://localhost:3000/movies`;
  let prevPage: string | null = `${baseUrl}?page=${page - 1}&perPage=${perPage}`;
  const nextPage: string = `${baseUrl}?page=${page + 1}&perPage=${perPage}`;

  if (page - 1 <= 0) {
    prevPage = null;
  }

  response.locals = {
    ...response.locals,
    pagination: {
      page: perPage * (page - 1),
      perPage,
      prevPage,
      nextPage,
    },
  };

  return next();
};

export default pagination;
