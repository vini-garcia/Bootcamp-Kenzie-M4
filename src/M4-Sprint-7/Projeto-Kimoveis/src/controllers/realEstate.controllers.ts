import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { createNewRealEstateService, getAllRealEstateService } from "../services/realEstates";

const createNewRealEstateController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstate: RealEstate | null = await createNewRealEstateService(request.body);
  return response.status(201).json(realEstate);
};

const getAllRealEstatesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateList: RealEstate[] = await getAllRealEstateService();
  return response.status(200).json(realEstateList);
};

export { createNewRealEstateController, getAllRealEstatesController };
