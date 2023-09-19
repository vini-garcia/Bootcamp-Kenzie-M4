import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { RealEstate } from "../entities";
import { AppError } from "../errors";

const verifyIfRealEstateIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  let realEstateId: number = 0;

  if (request.method === "POST") {
    realEstateId = Number(request.body.realEstateId);
  }

  if (request.method === "GET") {
    realEstateId = Number(request.params.id);
  }

  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);

  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: {
      id: realEstateId,
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  response.locals.realEstateId = realEstateId;

  return next();
};

export default verifyIfRealEstateIdExists;
