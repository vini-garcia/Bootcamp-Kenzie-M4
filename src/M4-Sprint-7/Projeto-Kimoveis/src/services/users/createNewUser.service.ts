import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userWithoutPasswordSchema } from "../../schemas/users.schemas";
import { UserCreate, UserWithoutPassword } from "../../interfaces";

const createNewUserService = async (payload: UserCreate): Promise<UserWithoutPassword> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  if (!payload.admin) {
    payload.admin = false;
  }

  const admin: boolean = payload.admin;

  const payloadWithAdmin = {
    ...payload,
    admin,
  };

  const userWithPassword = usersRepo.create(payloadWithAdmin);

  await usersRepo.save(userWithPassword);

  const user = userWithoutPasswordSchema.parse(userWithPassword);

  return user;
};

export { createNewUserService };
