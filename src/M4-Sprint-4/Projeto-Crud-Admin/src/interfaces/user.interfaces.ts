import { QueryResult } from "pg";
import { z } from "zod";
import { user, userCreate, userRead, userUpdate } from "../schemas";
import { userAndCourses, userReturn } from "../schemas/user.schema";

type User = z.infer<typeof user>;

type UserCreate = z.infer<typeof userCreate>;
type UserReturn = z.infer<typeof userReturn>;
type UserRead = z.infer<typeof userRead>;
type UserUpdate = z.infer<typeof userUpdate>;
type UserAndCourses = z.infer<typeof userAndCourses>;
type UserResult = QueryResult<User>;
type UserAndCourses2 = {
  id: number;
  name: string;
  description: string
}

interface IToken {
  token: string;
}

export { User, UserCreate, UserRead, UserUpdate, UserResult, IToken, UserReturn, UserAndCourses, UserAndCourses2 };
