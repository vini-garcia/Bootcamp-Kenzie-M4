import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Category } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyIfCategoryIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = Number(request.params.id);

  const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const category: Category | null = await categoriesRepo.findOne({
    where: {
      id: id,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  response.locals.categoryId = id;

  return next();
};

export default verifyIfCategoryIdExists;
