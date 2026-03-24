import express from "express";
import { checkOtp, sendOtp, verifyUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/send-otp", sendOtp);
userRouter.put("/check-otp", checkOtp);
userRouter.put("/verify-user", verifyUser);

export default userRouter;