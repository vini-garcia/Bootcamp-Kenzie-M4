import { Router } from "express";
import { userControllers } from "../controllers";
import middlewares from "../middlewares";
import { userCreate } from "../schemas";

const usersRouter: Router = Router();

usersRouter.post(
  "",
  middlewares.validateBody(userCreate),
  middlewares.verifyEmailAlreadyExists,
  userControllers.createNewUserController
);

usersRouter.get(
  "",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfUserIsAdmin,
  userControllers.getAllUsersController
);

usersRouter.get(
  "/:id/courses",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfUserIsAdmin,
  middlewares.verifyIfCourseIsFound,
  userControllers.getUserByIdController
);

export default usersRouter;
