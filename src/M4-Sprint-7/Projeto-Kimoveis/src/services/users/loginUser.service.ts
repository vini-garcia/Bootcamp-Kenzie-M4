import { compare } from "bcryptjs";
import { IToken, UserLogin } from "../../interfaces/users.interfaces";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

const loginUserService = async (payload: UserLogin): Promise<IToken> => {
  const emailBody: string = payload.email;

  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    email: emailBody,
  });

  const passwordMatch: boolean = await compare(payload.password, user!.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign({ admin: user!.admin }, String(process.env.SECRET_KEY), {
    expiresIn: String(process.env.EXPIRES_IN || "12h"),
    subject: String(user!.id),
  });

  return { token };
};

export { loginUserService };
