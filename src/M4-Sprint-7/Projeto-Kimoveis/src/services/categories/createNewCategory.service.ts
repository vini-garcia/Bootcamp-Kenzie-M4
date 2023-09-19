import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { CategoryCreate } from "../../interfaces";

const createNewCategoryService = async (payload: CategoryCreate): Promise<Category> => {
  const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const category: Category = categoriesRepo.create(payload);

  await categoriesRepo.save(category);

  return category;
};

export { createNewCategoryService };
