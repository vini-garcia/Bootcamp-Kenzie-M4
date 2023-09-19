import format from "pg-format";
import { User, UserAndCourses, UserCreate, UserRead, UserResult, UserReturn } from "../interfaces/user.interfaces";
import { client } from "../database";
import { userRead } from "../schemas";
import { hashSync } from "bcryptjs";
import { userAndCourses, userReturn } from "../schemas/user.schema";
import { QueryConfig } from "pg";

const createNewUserServices = async (payload: UserCreate): Promise<UserReturn> => {

  payload.password = hashSync(payload.password, 12);

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat);
  return userReturn.parse(query.rows[0]);
};

const getAllUsersServices = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userRead.parse(query.rows);
};

const getUserByIdServices = async (id: number): Promise<UserAndCourses> => {
  const queryString: string = `
  SELECT
    cs."id" "courseId",
    cs."name" "courseName",
    cs."description" "courseDescription",
    usercs."active" "userActiveInCourse",
    users."id" "userId",
    users."name" "userName"
  FROM
    "users"
  JOIN
    "userCourses" usercs ON users."id" = usercs."userId"
  JOIN
    "courses" cs ON cs."id" = usercs."courseId"
	WHERE
  	users."id" = $1;
    `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  return userAndCourses.parse(queryResult.rows);
};

export default { createNewUserServices, getAllUsersServices, getUserByIdServices };
