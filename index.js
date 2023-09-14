import express from "express";
import dotenv from "dotenv";
import endpoints from "./routes/routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`inicializado en ${port}`);
});

app.use(express.json())

app.use("/enfermeria", endpoints);