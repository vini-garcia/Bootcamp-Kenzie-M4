import { NextFunction, Request, Response } from "express";
import { AppError, NotFound } from "../error";
import { z } from "zod";

const handleError = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof NotFound) {
    return response.status(404).json({ message: error.message });
  }

  if (error instanceof z.ZodError) {
    return response.status(400).json(error.flatten().fieldErrors);
  }

  console.log(error);
  return response.status(500).json({ message: "Internal Server Error." });
};

export default handleError;
