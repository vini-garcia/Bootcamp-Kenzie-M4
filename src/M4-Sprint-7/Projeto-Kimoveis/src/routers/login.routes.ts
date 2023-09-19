import { Router } from "express";
import { ensureEmailExists, validateBody } from "../middlewares";
import { userLoginSchema } from "../schemas";
import { loginUserController } from "../controllers";

export const loginRoutes: Router = Router();

loginRoutes.post("", validateBody(userLoginSchema), ensureEmailExists, loginUserController);
