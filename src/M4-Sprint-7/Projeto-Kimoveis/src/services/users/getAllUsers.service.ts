import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { userListSchema } from "../../schemas/users.schemas";
import { UserWithoutPassword } from "../../interfaces";

const getAllUsersService = async (): Promise<UserWithoutPassword[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const usersWithPassword: User[] | null = await userRepo.find();

  const users = userListSchema.parse(usersWithPassword);

  return users;
};

export { getAllUsersService };
