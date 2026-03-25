import express from "express";
import { checkOtp, checkUser, sendOtp, verifyUser } from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/send-otp", sendOtp);
userRouter.put("/check-otp", checkOtp);
userRouter.put("/verify-user", authUser, verifyUser);
userRouter.get("/check-user", authUser, checkUser);

export default userRouter;