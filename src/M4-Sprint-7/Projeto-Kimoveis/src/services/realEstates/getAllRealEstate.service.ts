import { Repository } from "typeorm";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";

const getAllRealEstateService = async (): Promise<RealEstate[]> => {
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const realEstateList: RealEstate[] | null = await realEstateRepo
    .createQueryBuilder("realEstate")
    .leftJoinAndSelect("realEstate.address", "addresses")
    .getMany();

  return realEstateList;
};

export { getAllRealEstateService };
