import { Response, Request, NextFunction } from "express";
import { market } from "./database";
import { ICleaningProduct, IFoodProduct, TProductCreate } from "./interfaces";

const verifyIfIdExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { id } = request.params;

  const productIndex: number = market.findIndex(
    (product: IFoodProduct | ICleaningProduct): boolean => product.id === Number(id)
  );

  if (productIndex === -1) {
    const error: string = "Product not found";
    return response.status(404).json({ error });
  }

  response.locals.productIndex = productIndex;

  return next();
};

const verifyIfNameExistsForNewProducts = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const payload: TProductCreate[] = request.body;

  const requestList: IFoodProduct | ICleaningProduct | undefined | TProductCreate = payload.find(
    (product) => product.name
  );

  if (!requestList) {
    return next();
  }

  const foundProduct: boolean = payload.some((product) =>
    market.find((element) => element.name === product.name)
  );

  if (foundProduct) {
    return response.status(409).json({ error: "Product already registered" });
  }

  return next();
};

const verifyIfNameExists = (
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  const { name } = request.body;
  if (!name) {
    return next();
  }

  const foundProduct: IFoodProduct | ICleaningProduct | undefined = market.find(
    (val: IFoodProduct | ICleaningProduct): boolean => val.name === name
  );

  if (foundProduct) {
    return response.status(409).json({ error: "Product already registered" });
  }

  return next();
};

export default {
  verifyIfIdExists,
  verifyIfNameExistsForNewProducts,
  verifyIfNameExists,
};
