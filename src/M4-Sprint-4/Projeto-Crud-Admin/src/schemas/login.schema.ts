import { z } from "zod";

const login = z.object({
  email: z.string().email().max(50),
  password: z.string().max(120),
});

export { login };
