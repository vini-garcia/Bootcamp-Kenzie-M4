import { Router } from "express";
import {
  validateBody,
  verifyIfIsCommercialHour,
  verifyIfIsWeekDay,
  verifyIfRealEstateHaveFreeSchedule,
  verifyIfRealEstateIdExists,
  verifyIfTokenIsValid,
  verifyIfUserHaveFreeSchedule,
  verifyIfUserIsAdmin,
} from "../middlewares";
import { createNewSchedulesController, getAllSchedulesController } from "../controllers";
import { schedulesCreateSchema } from "../schemas";

export const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  verifyIfTokenIsValid,
  validateBody(schedulesCreateSchema),
  verifyIfRealEstateIdExists,
  verifyIfUserHaveFreeSchedule,
  verifyIfRealEstateHaveFreeSchedule,
  verifyIfIsWeekDay,
  verifyIfIsCommercialHour,
  createNewSchedulesController
);

schedulesRoutes.get(
  "/realEstate/:id",
  verifyIfTokenIsValid,
  verifyIfUserIsAdmin,
  verifyIfRealEstateIdExists,
  getAllSchedulesController
);
