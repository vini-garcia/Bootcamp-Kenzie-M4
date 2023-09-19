import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userWithoutPasswordSchema } from "../../schemas/users.schemas";
import { UserUpdate, UserWithoutPassword } from "../../interfaces";

const updateUserService = async (payload: UserUpdate, id: number): Promise<UserWithoutPassword> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const userFound: User | null = await usersRepo.findOne({
    where: {
      id: id,
    },
  });

  const userUpdated = usersRepo.create({
    ...userFound!,
    ...payload,
  });

  await usersRepo.save(userUpdated);

  const user = userWithoutPasswordSchema.parse(userUpdated);

  return user;
};

export { updateUserService };
