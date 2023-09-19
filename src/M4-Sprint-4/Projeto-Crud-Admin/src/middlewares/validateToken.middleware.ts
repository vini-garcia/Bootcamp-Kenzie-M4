import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { verify } from "jsonwebtoken";

const verifyIfTokenIsValid = (request: Request, response: Response, next: NextFunction): void => {
  const authorization: string | undefined = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const [_bearer, token] = authorization.split(" ");

  const decoded = verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }
    response.locals.admin = decoded.admin;
    response.locals.id = Number(decoded.sub);
  });

  return next();
};

export default verifyIfTokenIsValid;
