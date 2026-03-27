import express from "express";
import authUser from "../middlewares/authUser.js";
import { isApplicationExists } from "../controllers/applicationControllers.js";

const applicationRouter = express.Router();

applicationRouter.get("/check-application", authUser, isApplicationExists);

export default applicationRouter;