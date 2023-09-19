import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces/user.interfaces";
import { AppError } from "../error";

const verifyIfUserIdAndCourseIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = request.params;
  const { userId } = request.params;

  const query: UserResult = await client.query('SELECT * FROM "users" WHERE "id" = $1', [userId]);

  if (query.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  const queryCourses: UserResult = await client.query('SELECT * FROM "courses" WHERE "id" = $1', [
    courseId,
  ]);

  if (queryCourses.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  response.locals.userCourseId = Number(queryCourses.rows[0].id);

  return next();
};

export default verifyIfUserIdAndCourseIdExists;
