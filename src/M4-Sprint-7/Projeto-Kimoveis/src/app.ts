import "express-async-errors";
import "reflect-metadata";
import express from "express";
import {
  categoriesRoutes,
  loginRoutes,
  realEstatesRoutes,
  schedulesRoutes,
  usersRoutes,
} from "./routers";
import { handleError, validateBody } from "./middlewares";
import { userCreateSchema } from "./schemas";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/realestate", realEstatesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleError);

export default app;
