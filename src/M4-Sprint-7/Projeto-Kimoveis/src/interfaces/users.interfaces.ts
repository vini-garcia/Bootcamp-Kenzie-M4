import { z } from "zod";
import {
  userCreateSchema,
  userLoginSchema,
  userSchema,
  userUpdateSchema,
  userWithoutPasswordSchema,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type User = z.infer<typeof userSchema>;

type UserWithoutPassword = z.infer<typeof userWithoutPasswordSchema>;

type UserCreate = z.infer<typeof userCreateSchema>;

type UserLogin = z.infer<typeof userLoginSchema>;

type UserUpdateWithoutDeepPartial = z.infer<typeof userUpdateSchema>;

type UserUpdate = DeepPartial<UserUpdateWithoutDeepPartial>;

interface IToken {
  token: string;
}

export {
  User,
  UserWithoutPassword,
  UserCreate,
  UserLogin,
  UserUpdateWithoutDeepPartial,
  UserUpdate,
  IToken,
};
