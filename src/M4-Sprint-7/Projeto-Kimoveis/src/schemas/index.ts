import { addressSchema, addressCreateSchema } from "./addresses.schemas";
import { categorySchema, categoryListSchema, categoryCreateSchema } from "./categories.schemas";
import {
  realEstateSchema,
  realEstateCreateSchema,
  realEstateCompleteSchema,
} from "./realEstate.schemas";
import {
  schedulesSchema,
  schedulesCreateSchema,
  schedulesWithUserIdSchema,
  scheduleListSchema,
} from "./schedules.schemas";
import {
  userSchema,
  userWithoutPasswordSchema,
  userListSchema,
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
  userUpdateBodySchema,
} from "./users.schemas";

export {
  addressSchema,
  addressCreateSchema,
  categorySchema,
  categoryListSchema,
  categoryCreateSchema,
  realEstateSchema,
  realEstateCreateSchema,
  realEstateCompleteSchema,
  schedulesSchema,
  scheduleListSchema,
  schedulesCreateSchema,
  schedulesWithUserIdSchema,
  userSchema,
  userWithoutPasswordSchema,
  userListSchema,
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
  userUpdateBodySchema,
};
