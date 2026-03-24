import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authUser = async (req,res,next) => {
    try {
        req.user = null;
        let token = null;
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return res.json({ success: false, message: "User not logged in" });
        }
        token = authHeader.split(" ")[1];
        if (!token) {
            return res.json({ success: false, message: "User not logged in" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        req.user = user;
        next();
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export default authUser;