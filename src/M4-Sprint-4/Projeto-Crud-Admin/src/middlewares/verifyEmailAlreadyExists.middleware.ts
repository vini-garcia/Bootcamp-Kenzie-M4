import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { UserResult } from "../interfaces/user.interfaces";
import { client } from "../database";
import { AppError } from "../error";

const verifyEmailAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const { email } = request.body;
  const queryString: string = `
        SELECT 
          *
        FROM 
          "users"
        WHERE
          email = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    const message: string = "Email already registered";
    throw new AppError(message, 409);
  }

  return next();
};

export default verifyEmailAlreadyExists;
