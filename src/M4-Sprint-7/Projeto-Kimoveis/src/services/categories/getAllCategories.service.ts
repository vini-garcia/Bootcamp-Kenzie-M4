import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";

const getAllCategoriesService = async (): Promise<Category[]> => {
  const categoriesRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const categories: Category[] | null = await categoriesRepo.find();

  return categories;
};

export { getAllCategoriesService };
