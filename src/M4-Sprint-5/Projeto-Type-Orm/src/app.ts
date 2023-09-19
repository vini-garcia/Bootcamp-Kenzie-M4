import "express-async-errors";
import express, { Application } from "express";
import { movieRouter } from "./routers";
import middlewares from "./middlewares";

const app: Application = express();

app.use(express.json());

app.use("/movies", movieRouter);

app.use(middlewares.handleError);

export default app;
