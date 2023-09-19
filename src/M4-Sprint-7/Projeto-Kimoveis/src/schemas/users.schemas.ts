import { z } from "zod";

const userSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(45).nonempty(),
  email: z.string().max(45).email(),
  admin: z.boolean().default(() => false),
  password: z.string().max(120).nonempty(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
  deletedAt: z.string().or(z.date()).nullable(),
});

const userWithoutPasswordSchema = userSchema.omit({
  password: true,
});

const userListSchema = userWithoutPasswordSchema.array();

const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const userLoginSchema = userCreateSchema.pick({
  email: true,
  password: true,
});

const userUpdateSchema = userCreateSchema.omit({
  admin: true,
});

const userUpdateBodySchema = userUpdateSchema.partial();

export {
  userSchema,
  userWithoutPasswordSchema,
  userListSchema,
  userCreateSchema,
  userLoginSchema,
  userUpdateSchema,
  userUpdateBodySchema,
};
