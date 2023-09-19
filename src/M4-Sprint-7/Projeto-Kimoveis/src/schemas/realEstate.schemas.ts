import { string, z } from "zod";
import { addressCreateSchema, addressSchema } from "./addresses.schemas";
import { categorySchema } from "./categories.schemas";

const realEstateSchema = z.object({
  id: z.number().positive().int(),
  sold: z.boolean().default(() => false),
  value: z
    .number()
    .or(string())
    .default(() => 0),
  size: z.number().positive().int(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

const realEstateCreateSchema = realEstateSchema
  .omit({
    id: true,
    sold: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    address: addressCreateSchema,
    categoryId: z.number().int(),
  });

const realEstateCompleteSchema = realEstateSchema.extend({
  address: addressSchema,
  category: categorySchema,
});

export { realEstateSchema, realEstateCreateSchema, realEstateCompleteSchema };
