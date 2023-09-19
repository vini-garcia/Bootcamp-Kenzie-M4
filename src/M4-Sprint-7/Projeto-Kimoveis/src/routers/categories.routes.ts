import { Router } from "express";
import {
  validateBody,
  verifyIfCategoryIdExists,
  verifyIfCategoryNameExists,
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
} from "../middlewares";
import { categoryCreateSchema } from "../schemas";
import {
  createNewCategoryController,
  getAllCategoriesController,
  getRealEstateFromCategoryController,
} from "../controllers";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  validateBody(categoryCreateSchema),
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
  verifyIfCategoryNameExists,
  createNewCategoryController
);

categoriesRoutes.get("", getAllCategoriesController);

categoriesRoutes.get(
  "/:id/realEstate",
  verifyIfCategoryIdExists,
  getRealEstateFromCategoryController
);
