import { Router } from "express";
import { createNewRealEstateController, getAllRealEstatesController } from "../controllers";
import {
  validateBody,
  verifyIfAddressExists,
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
} from "../middlewares";
import { realEstateCreateSchema } from "../schemas";

export const realEstatesRoutes: Router = Router();

realEstatesRoutes.post(
  "",
  validateBody(realEstateCreateSchema),
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
  verifyIfAddressExists,
  createNewRealEstateController
);

realEstatesRoutes.get("", getAllRealEstatesController);
