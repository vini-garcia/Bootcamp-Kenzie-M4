import { z } from "zod";
import { login } from "../schemas";

type Login = z.infer<typeof login>;

export { Login };
