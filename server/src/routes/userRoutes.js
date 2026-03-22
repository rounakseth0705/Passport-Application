import express from "express";
import { sendOtp, verifyUserFromOtp } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/send-otp/:email", sendOtp);
userRouter.post("/verify-user", verifyUserFromOtp);

export default userRouter;