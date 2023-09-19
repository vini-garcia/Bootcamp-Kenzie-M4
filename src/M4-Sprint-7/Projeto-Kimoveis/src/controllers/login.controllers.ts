import { Request, Response } from "express";
import { IToken } from "../interfaces/users.interfaces";
import { loginUserService } from "../services/users";

const loginUserController = async (request: Request, response: Response): Promise<Response> => {
  const token: IToken = await loginUserService(request.body);
  return response.status(200).json(token);
};

export { loginUserController };
