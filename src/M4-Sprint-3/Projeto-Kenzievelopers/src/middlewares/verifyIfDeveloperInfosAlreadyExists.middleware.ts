import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { TDeveloperResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../error";

const verifyIfDeveloperInfosAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(request.params.id);
  const queryString: string = `
      SELECT
        *
      FROM
      "developerInfos"
      WHERE
        "developerId" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: TDeveloperResult = await client.query(queryConfig);

  if (queryResult.rowCount > 0) {
    const message: string = "Developer infos already exists.";
    throw new AppError(message, 409);
  }

  return next();
};

export default verifyIfDeveloperInfosAlreadyExists;
