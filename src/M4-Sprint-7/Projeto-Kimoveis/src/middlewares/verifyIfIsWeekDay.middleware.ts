import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyIfIsWeekDay = (request: Request, response: Response, next: NextFunction): void => {
  const date: Date = new Date(request.body.date);

  const dayOfWeek: number = date.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  return next();
};

export default verifyIfIsWeekDay;
