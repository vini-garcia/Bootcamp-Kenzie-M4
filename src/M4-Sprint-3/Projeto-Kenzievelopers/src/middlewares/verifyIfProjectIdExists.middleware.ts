import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { TProjectResult } from "../interfaces";
import { client } from "../database";
import { NotFound } from "../error";

const verifyIfProjectIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const projectId: number = Number(request.params.id);
  let queryString: string = `
        SELECT
          *
        FROM
          projects
        WHERE
          id = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [projectId],
  };

  const queryResult: TProjectResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    const message: string = "Developer not found.";
    throw new NotFound(message);
  }

  return next();
};

export default verifyIfProjectIdExists;
