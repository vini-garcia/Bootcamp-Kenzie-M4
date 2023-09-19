import { Request, Response } from "express";
import { IToken } from "../interfaces/user.interfaces";
import { loginServices } from "../services";

const loginUserController = async (request: Request, response: Response): Promise<Response> => {
  const token: IToken = await loginServices.loginUserService(request.body);
  return response.status(200).json(token);
};

export default { loginUserController };
