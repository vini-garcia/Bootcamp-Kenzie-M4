import express, { Application } from "express";
import { startDatabase } from "./database";
import { createNewMovie, updateMovie, getMovies, deleteMovie, getMovieById } from "./logics";
import { verifyIfNameExists, verifyIfIdExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies", verifyIfNameExists, createNewMovie);

app.get("/movies", getMovies);

app.use("/movies/:id", verifyIfIdExists);

app.get("/movies/:id", getMovieById);

app.patch("/movies/:id", verifyIfNameExists, updateMovie);

app.delete("/movies/:id", deleteMovie);

app.listen(process.env.PORT, async () => {
  await startDatabase();
  console.log(`Server is running on port ${process.env.PORT}`);
});
