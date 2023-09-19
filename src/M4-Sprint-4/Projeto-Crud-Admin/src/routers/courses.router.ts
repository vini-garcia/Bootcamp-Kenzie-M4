import { Router } from "express";
import middlewares from "../middlewares";
import { courseCreate } from "../schemas";
import { coursesControllers } from "../controllers";

const coursesRouter: Router = Router();

coursesRouter.post(
  "",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfUserIsAdmin,
  middlewares.validateBody(courseCreate),
  coursesControllers.createNewCourseController
);

coursesRouter.get("", coursesControllers.getAllCoursesController);

coursesRouter.post(
  "/:courseId/users/:userId",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfUserIsAdmin,
  middlewares.verifyIfUserIdAndCourseIdExists,
  coursesControllers.joinUserToCourseController
);

coursesRouter.delete(
  "/:courseId/users/:userId",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfUserIsAdmin,
  middlewares.verifyIfUserIdAndCourseIdExists,
  coursesControllers.deleteCourseController
);

coursesRouter.get(
  "/:id/users",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfUserIsAdmin,
  coursesControllers.getAllUsersFromCourseController
);

export default coursesRouter;
