import { Request, Response } from "express";
import { IProject, TProjectInfo } from "../interfaces";
import { projectsServices } from "../services";

const createNewProject = async (request: Request, response: Response): Promise<Response> => {
  const payload = request.body;
  const project: IProject = await projectsServices.createNewProject(request.body);
  return response.status(201).json(project);
};

const getProjectById = async (request: Request, response: Response): Promise<Response> => {
  const project: TProjectInfo = await projectsServices.getProjectById(Number(request.params.id));
  return response.status(200).json(project);
};

const updateProject = async (request: Request, response: Response): Promise<Response> => {
  const developer: IProject = await projectsServices.updateProject(
    request.body,
    Number(request.params.id)
  );
  return response.status(200).json(developer);
};

export default { createNewProject, getProjectById, updateProject };
