import { z } from "zod";
import {
  schedulesCreateSchema,
  schedulesSchema,
  schedulesWithUserIdSchema,
} from "../schemas/schedules.schemas";

type Schedule = z.infer<typeof schedulesSchema>;

type ScheduleCreate = z.infer<typeof schedulesCreateSchema>;

type SchedulesWithUserIdSchema = z.infer<typeof schedulesWithUserIdSchema>;

export { Schedule, ScheduleCreate, SchedulesWithUserIdSchema };
