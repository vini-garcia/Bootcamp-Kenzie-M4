import { NextFunction, Request, Response } from "express";
import { Schedule } from "../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

const verifyIfUserHaveFreeSchedule = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const tokenId: number = response.locals.tokenId;
  const date: Date | string = request.body.date;
  const hour: Date | string = request.body.hour;

  const schedulesRepo: Repository<Schedule> = AppDataSource.getRepository(Schedule);

  const userSchedules: Schedule | null = await schedulesRepo
    .createQueryBuilder("schedules")
    .where("schedules.userId = :userId", { userId: tokenId })
    .andWhere("schedules.date = :date", { date: date })
    .andWhere("schedules.hour = :hour", { hour: hour })
    .getOne();

  if (userSchedules) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  return next();
};

export default verifyIfUserHaveFreeSchedule;
