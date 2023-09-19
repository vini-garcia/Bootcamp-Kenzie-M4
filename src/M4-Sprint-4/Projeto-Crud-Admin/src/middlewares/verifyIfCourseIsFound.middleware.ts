import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import { AppError } from "../error";
import { client } from "../database";
import { CourseSearchResult } from "../interfaces/courses.interfaces";

const verifyIfCourseIsFound = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const id: string = request.params.id;
  
  const queryString: string = `
  SELECT
    *
  FROM
    "userCourses"
	WHERE
  "userCourses"."userId" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: CourseSearchResult = await client.query(queryConfig);

  if (queryResult.rowCount === 0) {
    throw new AppError("No course found", 404);
  }

  if (queryResult.rows[0].active == false) {
    throw new AppError("No course found", 404);
  }

  return next();
};

export default verifyIfCourseIsFound;
