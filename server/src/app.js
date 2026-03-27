import express from "express";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

export const app = express();

connectToDB();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);