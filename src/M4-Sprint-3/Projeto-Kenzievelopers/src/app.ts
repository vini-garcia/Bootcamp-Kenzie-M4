import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { developersRouter, projectsRouter } from "./routers";
import handleError from "./middlewares/handleErrors.middlewares";

const app: Application = express();

app.use(express.json());

app.use("/developers", developersRouter);
app.use("/projects", projectsRouter);

app.use(handleError);

export default app;
