import { z } from "zod";
import {
  categoryCreateSchema,
  categoryListSchema,
  categorySchema,
} from "../schemas/categories.schemas";

type Category = z.infer<typeof categorySchema>;

type CategoryList = z.infer<typeof categoryListSchema>;

type CategoryCreate = z.infer<typeof categoryCreateSchema>;

export { Category, CategoryList, CategoryCreate };
