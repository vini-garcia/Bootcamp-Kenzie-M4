import { Request, Response } from "express";
import { User, UserAndCourses, UserRead, UserReturn } from "../interfaces/user.interfaces";
import { userServices } from "../services";

const createNewUserController = async (request: Request, response: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createNewUserServices(response.locals.validated);

  return response.status(201).json(user);
};

const getAllUsersController = async (request: Request, response: Response): Promise<Response> => {
  const users: UserRead = await userServices.getAllUsersServices();
  return response.status(200).json(users);
};

const getUserByIdController = async (request: Request, response: Response): Promise<Response> => {
  const id: number = response.locals.id;

  const profile: UserAndCourses = await userServices.getUserByIdServices(id);
  return response.status(200).json(profile);
};

export default { createNewUserController, getAllUsersController, getUserByIdController };
