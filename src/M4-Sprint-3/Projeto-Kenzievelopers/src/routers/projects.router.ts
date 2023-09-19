import { Router } from "express";
import { projectsControllers } from "../controllers";
import middlewares from "../middlewares";

const projectsRouter: Router = Router();

projectsRouter.post(
  "",
  middlewares.verifyIfDeveloperIdExists,
  projectsControllers.createNewProject
);

projectsRouter.get("/:id", middlewares.verifyIfProjectIdExists, projectsControllers.getProjectById);

projectsRouter.patch(
  "/:id",
  middlewares.verifyIfProjectIdExists,
  middlewares.verifyIfDeveloperIdExists,
  projectsControllers.updateProject
);

export default projectsRouter;
