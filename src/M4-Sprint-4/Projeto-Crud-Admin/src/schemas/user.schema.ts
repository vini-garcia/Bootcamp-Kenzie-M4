import { z } from "zod";

const user = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
});

const userAndCourse = z.object({
  courseId: z.number().positive().nullable(),
  courseName: z.string().max(15).nullable(),
  courseDescription: z.string().nullable(),
  userActiveInCourse: z.boolean().nullable(),
  userId: z.number().positive().nullable(),
  userName: z.string().max(50).nullable(),
});

const userReturn = user.omit({ password: true });
const userCreate = user.omit({ id: true });
const userUpdate = userCreate.partial();
const userRead = userReturn.array();
const userAndCourses = userAndCourse.array();

export { user, userCreate, userUpdate, userRead, userReturn, userAndCourses };
