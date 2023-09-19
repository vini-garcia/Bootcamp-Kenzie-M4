import { Router } from "express";
import { loginControllers } from "../controllers";
import middlewares from "../middlewares";
import { login } from "../schemas";

const loginRouter: Router = Router();

loginRouter.post("", middlewares.validateBody(login), loginControllers.loginUserController);

export default loginRouter;
