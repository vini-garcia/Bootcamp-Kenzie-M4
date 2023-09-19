import { Router } from "express";
import middlewares from "../middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../schemas";
import { movieControllers } from "../controllers";

const movieRouter: Router = Router();

movieRouter.post(
  "",
  middlewares.validateBody(movieCreateSchema),
  middlewares.verifyIfNameExists,
  movieControllers.createNewMovieController
);

movieRouter.get(
  "",
  middlewares.pagination,
  middlewares.ordination,
  movieControllers.getAllMoviesController
);

movieRouter.use("/:id", middlewares.verifyIfIdExists);

movieRouter.patch(
  "/:id",
  middlewares.validateBody(movieUpdateSchema),
  middlewares.verifyIfNameExists,
  movieControllers.updateMovieController
);

movieRouter.delete("/:id", movieControllers.deleteMovieController);

export default movieRouter;
