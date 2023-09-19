import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { createNewScheduleService, getAllSchedulesService } from "../services/schedules";

const createNewSchedulesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const tokenId: number = response.locals.tokenId;
  const schedule: string = await createNewScheduleService(request.body, tokenId);
  return response.status(201).json({ message: schedule });
};

const getAllSchedulesController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const realEstateId: number = response.locals.realEstateId;
  const schedules: RealEstate | null = await getAllSchedulesService(realEstateId);
  return response.status(200).json(schedules);
};

export { createNewSchedulesController, getAllSchedulesController };
