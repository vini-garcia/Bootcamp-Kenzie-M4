import { NextFunction, Request, Response } from "express";

const ordination = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const querySort: any = request.query.sort;
  const queryOrder: any = request.query.order;

  const sortOptions: Array<string> = ["price", "duration"];
  const orderOptions: Array<string> = ["asc", "desc"];

  let sort: string;
  let order: string;

  if (!(querySort && sortOptions.includes(querySort))) {
    sort = "id";
  } else {
    sort = querySort;
  }

  if (!querySort || !(queryOrder && orderOptions.includes(queryOrder))) {
    order = "asc";
  } else {
    order = queryOrder;
  }

  response.locals.pagination = {
    ...response.locals.pagination,
    order,
    sort,
  };

  return next();
};

export default ordination;
