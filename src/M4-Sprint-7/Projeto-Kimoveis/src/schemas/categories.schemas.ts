import { z } from "zod";

const categorySchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45).nonempty(),
});

const categoryListSchema = categorySchema.array();

const categoryCreateSchema = categorySchema.omit({
  id: true,
});

export { categorySchema, categoryListSchema, categoryCreateSchema };
