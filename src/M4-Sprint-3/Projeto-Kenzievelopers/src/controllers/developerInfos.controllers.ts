import { Request, Response } from "express";
import { IDeveloperInfos } from "../interfaces";
import { developerInfosServices } from "../services";

const createNewDeveloperInfos = async (request: Request, response: Response): Promise<Response> => {
  const payload = request.body;
  const developerId: number = Number(request.params.id);

  const newDeveloperInfos: IDeveloperInfos = await developerInfosServices.createNewDeveloperInfos(
    developerId,
    payload
  );

  return response.status(201).json(newDeveloperInfos);
};

export default { createNewDeveloperInfos };
