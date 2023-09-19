import "dotenv/config";
import { QueryConfig } from "pg";
import { client } from "../database";
import { compare } from "bcryptjs";
import { AppError } from "../error";
import { sign } from "jsonwebtoken";
import { IToken, UserCreate, UserResult } from "../interfaces/user.interfaces";

const loginUserService = async (payload: UserCreate): Promise<IToken> => {
  const email: string = payload.email;
  const queryString: string = `
          SELECT 
              *
          FROM
              users
          WHERE
              "email" = $1;
      `;

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [email],
  };

  const queryResult: UserResult = await client.query(queryConfig);

  const user = queryResult.rows[0];

  if (!user) {
    throw new AppError("Wrong email/password", 401);
  }

  const passwordMatch: boolean = await compare(payload.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email/password", 401);
  }

  const token: string = sign(
    { email: user.email, admin: user.admin },
    String(process.env.SECRET_KEY),
    { expiresIn: String(process.env.EXPIRES_IN), subject: String(user.id) }
  );

  return { token };
};

export default { loginUserService };
