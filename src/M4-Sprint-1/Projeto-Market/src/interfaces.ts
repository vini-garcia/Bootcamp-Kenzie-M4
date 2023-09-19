interface IProduct {
  id: number;
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  expirationDate: Date;
}

interface ICleaningProduct extends IProduct {}

interface IFoodProduct extends IProduct {
  calories: number;
}

type TProductCreate = {
  name: string;
  price: number;
  weight: number;
  section: "food" | "cleaning";
  calories?: number;
};

type TProductUpdate = Partial<IFoodProduct>;

export { IProduct, ICleaningProduct, IFoodProduct, TProductCreate, TProductUpdate };
