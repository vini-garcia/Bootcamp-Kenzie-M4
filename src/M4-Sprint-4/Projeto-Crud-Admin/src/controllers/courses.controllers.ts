import { Request, Response } from "express";
import { coursesServices } from "../services";
import { Course, CourseCreate, CourseRead } from "../interfaces/courses.interfaces";
import { UserAndCourses, UserAndCourses2 } from "../interfaces/user.interfaces";

const createNewCourseController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const course: CourseCreate = await coursesServices.createNewCourseServices(response.locals.validated);
  return response.status(201).json(course);
};

const getAllCoursesController = async (request: Request, response: Response): Promise<Response> => {
  const courses: CourseRead = await coursesServices.getAllCoursesServices();
  return response.status(200).json(courses);
};

const joinUserToCourseController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { courseId } = request.params;
  const { userId } = request.params;
  await coursesServices.joinUserToCourseServices(Number(courseId), Number(userId));
  const message: string = "User successfully vinculed to course";
  return response.status(201).json({ message });
};

const deleteCourseController = async (request: Request, response: Response): Promise<Response> => {
  const { userCourseId } = response.locals;
  await coursesServices.deleteCourseServices(Number(userCourseId));
  return response.status(204).json();
};

const getAllUsersFromCourseController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { id } = request.params;
  const coursesUser: UserAndCourses2[] = await coursesServices.getAllUsersFromCourseServices(
    Number(id)
  );

  return response.status(200).json(coursesUser);
};

export default {
  createNewCourseController,
  getAllUsersFromCourseController,
  getAllCoursesController,
  joinUserToCourseController,
  deleteCourseController,
};
