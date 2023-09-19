import format from "pg-format";
import { client } from "../database";
import { Course, CourseCreate, CourseRead, CourseResult } from "../interfaces/courses.interfaces";
import { QueryConfig } from "pg";

const createNewCourseServices = async (payload: CourseCreate): Promise<CourseCreate> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows[0];
};

const getAllCoursesServices = async (): Promise<CourseRead> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');
  return query.rows;
};

const joinUserToCourseServices = async (courseId: number, userId: number): Promise<Course> => {
  const queryString: string = `
  INSERT INTO
    "userCourses" 
    ("userId", "courseId")
  VALUES
    ($1, $2)
  RETURNING *;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userId, courseId],
  };

  const queryResult: CourseResult = await client.query(queryConfig);

  return queryResult.rows[0];
};

const deleteCourseServices = async (userCourseId: number): Promise<void> => {
  const queryString: string = `
  UPDATE
    "userCourses"
  set
  	active = false
  WHERE 
    "userCourses".id = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [userCourseId],
  };

  const queryResult: CourseResult = await client.query(queryConfig);
};

const getAllUsersFromCourseServices = async (id: number): Promise<Course[]> => {
  const queryString: string = `
  SELECT
	  u.id  "userId", u."name" "userName", "userCourses"."courseId" "courseId", c."name" "courseName", c.description "courseDescription", "userCourses".active "userActiveInCourse" 
  FROM 
	  "userCourses"
  JOIN
	  users u on u.id = "userCourses"."userId"
  JOIN
	  courses c on c.id  = "userCourses"."courseId" 
  WHERE 
	  "userCourses"."courseId"  = $1;
`;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: CourseResult = await client.query(queryConfig);

  return queryResult.rows;
};

export default {
  createNewCourseServices,
  getAllUsersFromCourseServices,
  getAllCoursesServices,
  joinUserToCourseServices,
  deleteCourseServices,
};
