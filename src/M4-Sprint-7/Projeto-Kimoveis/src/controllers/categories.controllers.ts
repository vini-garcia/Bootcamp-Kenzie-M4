import { Request, Response } from "express";
import {
  createNewCategoryService,
  getAllCategoriesService,
  getRealEstateFromCategoryService,
} from "../services/categories";
import { Category, CategoryList } from "../interfaces";

const createNewCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const category: Category = await createNewCategoryService(request.body);
  return response.status(201).json(category);
};

const getAllCategoriesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categories: CategoryList = await getAllCategoriesService();
  return response.status(200).json(categories);
};

const getRealEstateFromCategoryController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const categoryId: number = response.locals.categoryId;
  const realEstateList: Category | null = await getRealEstateFromCategoryService(categoryId);
  return response.status(200).json(realEstateList);
};

export {
  createNewCategoryController,
  getAllCategoriesController,
  getRealEstateFromCategoryController,
};
