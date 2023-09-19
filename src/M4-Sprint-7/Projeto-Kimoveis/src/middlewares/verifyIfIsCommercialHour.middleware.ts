import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyIfIsCommercialHour = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const hourBody: string = request.body.hour;
  const hour: number = Number(hourBody.substring(0, 2));

  if (hour < 8 || hour > 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  return next();
};

export default verifyIfIsCommercialHour;
