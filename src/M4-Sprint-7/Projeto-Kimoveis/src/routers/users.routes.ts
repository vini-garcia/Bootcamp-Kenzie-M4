import { Router } from "express";
import {
  validateBody,
  verifyIfEmailExists,
  verifyIfTokenIsValid,
  verifyIfUserIdExists,
  verifyIfUserIsAdmin,
} from "../middlewares";
import { userCreateSchema, userUpdateBodySchema } from "../schemas";
import {
  createNewUserController,
  deleteUserController,
  getAllUsersController,
  updateUserController,
} from "../controllers";

export const usersRoutes: Router = Router();

usersRoutes.post("", validateBody(userCreateSchema), verifyIfEmailExists, createNewUserController);

usersRoutes.get("", verifyIfTokenIsValid, verifyIfUserIsAdmin, getAllUsersController);

usersRoutes.patch(
  "/:id",
  validateBody(userUpdateBodySchema),
  verifyIfUserIdExists,
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
  updateUserController
);

usersRoutes.delete(
  "/:id",
  verifyIfUserIdExists,
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
  deleteUserController
);
