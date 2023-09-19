import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateBody =
  (schema: z.AnyZodObject) =>
  (request: Request, response: Response, next: NextFunction): void => {
    const validated = schema.parse(request.body);
    response.locals = { ...response.locals, validated };

    return next();
  };

export default validateBody;
