import transporter from "../config/nodemailer.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const sendOtp = async (req,res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ success: faalse, message: "Email missing" });
        }
        const isUserExists = await User.findOne({ email });
        const otp = String(Math.floor(1000 + Math.random() * 9000));
        const otpExpireAt = Date.now() + 5*60*1000;
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Passport Application email verification",
            text: `Here is your passport application otp, ${otp}`
        };
        if (isUserExists) {
            isUserExists.otp = otp;
            isUserExists.otpExpireAt = otpExpireAt;
            await isUserExists.save();
        } else {
            await User.create({ email, otp, otpExpireAt });
        }
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Otp sent to your email" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const checkOtp = async (req,res) => {
    try {
        const { email, otp } = req.body;
        if (!otp) {
            return res.json({ success: false, message: "Otp missing" });
        }
        const user = await User.findOne({ email });
        if (user.otp !== otp) {
            return res.json({ success: false, message: "Invalid OTP" });
        }
        if (user.otpExpireAt < Date.now()) {
            return res.json({ success: false, message: "Otp exipred, generate another!" });
        }
        user.otp = "";
        user.otpExpireAt = 0;
        const isVerified = user.isVerified;
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        if (isVerified) {
            return res.json({ success: true, isVerified, token, message: "Welcome back to passport application" });
        }
        return res.json({ success: true, isVerified, token, message: "Welcome to passport application" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyUser = async (req,res) => {
    try {
        const { name, mobile, gender, dob } = req.body;
        const userId = req.user._id;
        if (!name || !mobile || !gender || !dob || !userId) {
            return res.json({ success: false, message: "Details Missing" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        user.name = name;
        user.mobile = mobile;
        user.gender = gender;
        user.dob = dob;
        user.isVerified = true;
        await user.save();
        return res.json({ success: true, user, message: "Details saved" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const checkUser = async (req,res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.json({ success: false, message: "User not logged in" });
        }
        return res.json({ success: true, user, message: "User details" });
    } catch(error) {
        console.loga(error.message);
        return res.json({ success: false, message: error.message });
    }
}