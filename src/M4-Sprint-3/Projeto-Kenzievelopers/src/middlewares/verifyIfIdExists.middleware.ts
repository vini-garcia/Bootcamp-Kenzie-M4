import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { TDeveloperResult } from "../interfaces";
import { client } from "../database";
import { NotFound } from "../error";

const verifyIfIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(request.params.id);
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
    values: [id],
  };

  const queryResult: TDeveloperResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    const message: string = "Developer not found.";
    throw new NotFound(message);
  }

  return next();
};

export default verifyIfIdExists;
