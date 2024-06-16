import express from "express";
import body from "body-parser";
import dotenv from "dotenv";
import kanbanboard from "./routes/kanbanBoard";
import task from "./routes/task";
import path from "path";
import { handleError } from "./middlewares/errors";
import cors from "cors";

const app = express();

// middleware for error handling
app.use(handleError);

// middleware for cors
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE",
        credentials: true
    }
))

app.use(body.urlencoded({ extended: true }));
app.use(body.json());

// Setting up config file
dotenv.config({ path: path.resolve(__dirname, "./config/.env") })

app.use("/api", kanbanboard);
app.use("/api", task);

export default app;