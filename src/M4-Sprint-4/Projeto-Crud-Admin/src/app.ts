import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { coursesRouter, loginRouter, usersRouter } from "./routers";
import middlewares from "./middlewares";

const app: Application = express();

app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

app.use(middlewares.handleError);

export default app;
