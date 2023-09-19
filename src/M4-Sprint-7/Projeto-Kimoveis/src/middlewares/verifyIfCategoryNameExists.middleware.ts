import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyIfCategoryNameExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const name: string = request.body.name;

  const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const user: Category | null = await categoriesRepo.findOne({
    where: {
      name: name,
    },
  });

  if (user && name) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};

export default verifyIfCategoryNameExists;
