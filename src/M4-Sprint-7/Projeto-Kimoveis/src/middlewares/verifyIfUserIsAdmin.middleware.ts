import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

const verifyIfUserIsAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const admin: boolean = response.locals.admin;
  const id: number = response.locals.tokenId;

  if (!admin) {
    if (request.method === "GET" || request.method === "POST" || request.method === "DELETE") {
      throw new AppError("Insufficient permission", 403);
    }

    if (request.method === "PATCH") {
      const idParams: number = Number(request.params.id);
      if (idParams !== id) {
        throw new AppError("Insufficient permission", 403);
      }

      return next();
    }
  }

  return next();
};

export default verifyIfUserIsAdmin;
