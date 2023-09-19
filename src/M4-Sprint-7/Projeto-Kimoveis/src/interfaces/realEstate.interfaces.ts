import { z } from "zod";
import {
  realEstateCompleteSchema,
  realEstateCreateSchema,
  realEstateSchema,
} from "../schemas/realEstate.schemas";
import { DeepPartial } from "typeorm";

type RealEstate = z.infer<typeof realEstateSchema>;

type RealEstateComplete = z.infer<typeof realEstateCompleteSchema>;

type RealEstateCreate = z.infer<typeof realEstateCreateSchema>;

type RealEstateCreateDeepPartial = DeepPartial<RealEstateCreate>;

type RealEstateDeepPartial = DeepPartial<RealEstateCreate>;

export {
  RealEstate,
  RealEstateComplete,
  RealEstateCreate,
  RealEstateCreateDeepPartial,
  RealEstateDeepPartial,
};
