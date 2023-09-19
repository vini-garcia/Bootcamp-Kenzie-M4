import { z } from "zod";

const schedulesSchema = z.object({
  id: z.number().positive().int(),
  date: z.string().nonempty(),
  hour: z.string().nonempty(),
  userId: z.number().positive().int(),
  realEstateId: z.number().positive().int(),
});

const schedulesCreateSchema = schedulesSchema.omit({
  id: true,
  userId: true,
});

const scheduleListSchema = schedulesSchema.array();

const schedulesWithUserIdSchema = schedulesSchema.omit({
  id: true,
});
export { schedulesSchema, schedulesCreateSchema, schedulesWithUserIdSchema, scheduleListSchema };
