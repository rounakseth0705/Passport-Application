import express from "express";
import "dotenv/config";
import connectToDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

export const app = express();

connectToDB();

app.use(express.json());
app.use("/api/user", userRouter);