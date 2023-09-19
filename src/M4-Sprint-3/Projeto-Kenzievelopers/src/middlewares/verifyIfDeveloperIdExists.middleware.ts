import { NextFunction, Request, Response } from "express";
import { TDeveloperResult } from "../interfaces";
import { QueryConfig } from "pg";
import { client } from "../database";
import { NotFound } from "../error";

const verifyIfDeveloperIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const developerId: number = request.body.developerId;

  const queryString: string = `
      SELECT
        *
      FROM
        developers
      WHERE
        id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [developerId],
  };

  const queryResult: TDeveloperResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    const message: string = "Developer not found.";
    throw new NotFound(message);
  }

  return next();
};

export default verifyIfDeveloperIdExists;
