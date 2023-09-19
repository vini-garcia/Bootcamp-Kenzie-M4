import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { ScheduleCreate } from "../../interfaces";

const createNewScheduleService = async (
  payload: ScheduleCreate,
  tokenId: number
): Promise<string> => {
  const schedulesRepo: Repository<any> = AppDataSource.getRepository(Schedule);
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const foundUser: User | null = await usersRepo.findOneBy({ id: tokenId });
  const foundRealEstate: RealEstate[] = await realEstateRepo.findBy({ id: payload.realEstateId });
  const { hour, date } = payload;
  const payloadWithUser = {
    hour,
    date,
    user: foundUser,
    realEstate: foundRealEstate[0]!,
  };

  const schedule = schedulesRepo.create(payloadWithUser);

  await schedulesRepo.save(schedule);

  return "Schedule created";
};

export { createNewScheduleService };
