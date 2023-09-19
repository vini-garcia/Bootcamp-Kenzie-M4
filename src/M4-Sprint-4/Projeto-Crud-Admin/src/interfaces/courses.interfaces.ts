import { QueryResult } from "pg";
import { z } from "zod";
import { course, courseCreate, courseRead, courseUpdate } from "../schemas/courses.schema";

type Course = z.infer<typeof course>;

type CourseCreate = z.infer<typeof courseCreate>;
type CourseRead = z.infer<typeof courseRead>;
type CourseUpdate = z.infer<typeof courseUpdate>;
type CourseSearch = {
    id: number;
    active: boolean;
    userId: number;
    courseId: number
}

type CourseSearchResult = QueryResult<CourseSearch>

type CourseResult = QueryResult<Course>;
export { Course, CourseCreate, CourseRead, CourseUpdate, CourseResult, CourseSearchResult, CourseSearch };
