import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const deleteUserService = async (id: number): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const userFound: User | null = await usersRepo.findOne({
    where: {
      id: id,
    },
  });

  await usersRepo.softRemove(userFound!);
};

export { deleteUserService };
