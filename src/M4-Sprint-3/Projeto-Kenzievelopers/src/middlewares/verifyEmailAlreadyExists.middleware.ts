import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";
import { TDeveloperResult } from "../interfaces";
import { AppError } from "../error";

const verifyEmailAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = request.body.email;
  const queryString: string = `
      SELECT 
        *
      FROM 
        developers
      WHERE
        email = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: TDeveloperResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    const message: string = "Email already exists.";
    throw new AppError(message, 409);
  }

  return next();
};

export default verifyEmailAlreadyExists;
