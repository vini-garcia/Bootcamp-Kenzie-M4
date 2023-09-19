import { Router } from "express";
import { developerInfosControllers, developersControllers } from "../controllers";
import middlewares from "../middlewares";

const developersRouter: Router = Router();

developersRouter.post(
  "",
  middlewares.verifyEmailAlreadyExists,
  developersControllers.createNewDeveloper
);

developersRouter.use("/:id", middlewares.verifyIfIdExists);

developersRouter.get("/:id", developersControllers.getDeveloperById);

developersRouter.patch(
  "/:id",
  middlewares.verifyEmailAlreadyExists,
  developersControllers.updateDeveloper
);

developersRouter.delete("/:id", developersControllers.deleteDeveloper);

developersRouter.post(
  "/:id/infos",
  middlewares.verifyIfPreferredOSExists,
  middlewares.verifyIfIdExists,
  middlewares.verifyIfDeveloperInfosAlreadyExists,
  developerInfosControllers.createNewDeveloperInfos
);

export default developersRouter;
