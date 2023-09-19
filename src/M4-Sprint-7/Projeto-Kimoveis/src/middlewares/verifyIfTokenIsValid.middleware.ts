import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

const verifyIfTokenIsValid = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const tokenRequest: string | undefined = request.headers["authorization"];

  if (!tokenRequest) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = tokenRequest.split(" ")[1];

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    response.locals.tokenId = Number(decoded.sub);

    response.locals.admin = decoded.admin;
  });

  return next();
};

export default verifyIfTokenIsValid;
