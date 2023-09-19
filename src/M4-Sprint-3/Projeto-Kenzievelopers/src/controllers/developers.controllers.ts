import { Request, Response } from "express";
import { IDeveloper, TDeveloperInfo } from "../interfaces";
import { developersServices } from "../services";

const createNewDeveloper = async (request: Request, response: Response): Promise<Response> => {
  const payload = request.body;
  const developer: IDeveloper = await developersServices.createNewDeveloper(request.body);
  return response.status(201).json(developer);
};

const getDeveloperById = async (request: Request, response: Response): Promise<Response> => {
  const developer: TDeveloperInfo = await developersServices.getDeveloperById(
    Number(request.params.id)
  );
  return response.status(200).json(developer);
};

const updateDeveloper = async (request: Request, response: Response): Promise<Response> => {
  const developer: IDeveloper = await developersServices.updateDeveloper(
    request.body,
    request.params.id
  );
  return response.status(200).json(developer);
};

const deleteDeveloper = async (request: Request, response: Response): Promise<Response> => {
  await developersServices.deleteDeveloper(request.params.id);
  return response.status(204).json();
};

export default { createNewDeveloper, getDeveloperById, updateDeveloper, deleteDeveloper };
