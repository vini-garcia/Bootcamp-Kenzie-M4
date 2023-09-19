import { Request, Response } from "express";
import {
  createNewUserService,
  deleteUserService,
  getAllUsersService,
  updateUserService,
} from "../services/users";
import { UserWithoutPassword } from "../interfaces";

const createNewUserController = async (request: Request, response: Response): Promise<Response> => {
  const user: UserWithoutPassword = await createNewUserService(request.body);
  return response.status(201).json(user);
};

const getAllUsersController = async (request: Request, response: Response): Promise<Response> => {
  const users: UserWithoutPassword[] = await getAllUsersService();
  return response.status(200).json(users);
};

const updateUserController = async (request: Request, response: Response): Promise<Response> => {
  const id: number = response.locals.user.id;
  const user: UserWithoutPassword = await updateUserService(request.body, id);
  return response.status(200).json(user);
};

const deleteUserController = async (request: Request, response: Response): Promise<Response> => {
  const id: number = response.locals.user.id;
  await deleteUserService(id);
  return response.status(204).send();
};

export {
  createNewUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController,
};
