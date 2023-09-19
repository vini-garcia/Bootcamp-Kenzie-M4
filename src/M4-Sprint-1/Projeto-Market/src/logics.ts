import { market } from "./database";
import {
  IProduct,
  ICleaningProduct,
  IFoodProduct,
  TProductCreate,
  TProductUpdate,
} from "./interfaces";
import { Request, Response } from "express";

const createNewProduct = (request: Request, response: Response): Response => {
  const nextId = (): number => {
    const lastItem: IProduct | undefined = market.sort((a, b): number => a.id - b.id).at(-1);

    if (!lastItem) {
      return 1;
    }

    return lastItem.id + 1;
  };

  const payload: TProductCreate[] = request.body;

  const newProductsList: (ICleaningProduct | IFoodProduct)[] = payload.map((product) => {
    const newProduct: ICleaningProduct | IFoodProduct = {
      id: nextId(),
      ...product,
      expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    };
    market.push(newProduct);
    return newProduct;
  });

  const total: number = payload.reduce((sum, value) => sum + value.price, 0);

  return response.status(201).json({ total, marketProducts: newProductsList });
};

const getAllProducts = (request: Request, response: Response): Response => {
  const total: number = market.reduce((sum, value) => sum + value.price, 0);

  return response.status(200).json({ total, marketProducts: market });
};

const getProductById = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals;
  const product: ICleaningProduct | IFoodProduct = market[productIndex];

  return response.status(200).json(product);
};

const updateProduct = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals;

  const payload: TProductUpdate = request.body;

  const updateProduct: ICleaningProduct | IFoodProduct = (market[productIndex] = {
    ...market[productIndex],
    ...payload,
  });

  return response.status(200).json(updateProduct);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const { productIndex } = response.locals;

  market.splice(productIndex, 1);

  return response.status(204).json();
};

export default { createNewProduct, getAllProducts, getProductById, deleteProduct, updateProduct };
