import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Address } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { AddressCreate } from "../interfaces";

const verifyIfAddressExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const address: AddressCreate = request.body.address;

  const addressesRepo: Repository<Address> = AppDataSource.getRepository(Address);

  if (!address.number) {
    address.number = "";
  }

  const addressRepo: Address | null = await addressesRepo.findOne({
    where: {
      street: address.street,
      zipCode: address.zipCode,
      number: address.number,
      city: address.city,
      state: address.state,
    },
  });

  if (address && addressRepo) {
    throw new AppError("Address already exists", 409);
  }

  return next();
};

export default verifyIfAddressExists;
