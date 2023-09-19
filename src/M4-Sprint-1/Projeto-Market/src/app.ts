import express, { Application } from "express";
import logics from "./logics";
import middlewares from "./middlewares";

const app: Application = express();

app.use(express.json());

app.post("/products", middlewares.verifyIfNameExistsForNewProducts, logics.createNewProduct);

app.get("/products", logics.getAllProducts);

app.use("/products/:id", middlewares.verifyIfIdExists);

app.get("/products/:id", logics.getProductById);

app.patch("/products/:id", middlewares.verifyIfNameExists, logics.updateProduct);

app.delete("/products/:id", logics.deleteProduct);

app.listen(3000, () => console.log("Server is running on port 127.0.0.1:3000/"));
