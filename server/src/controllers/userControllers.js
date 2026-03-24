import transporter from "../config/nodemailer.js";
import User from "../models/userModel.js";

export const sendOtp = async (req,res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.json({ success: faalse, message: "Email missing" });
        }
        const isUserExists = await User.findOne({ email });
        const otp = String(Math.floor(10000000 + Math.random() * 90000000));
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
        if (isVerified) {
            return res.json({ success: true, isVerified, message: "Welcome back to passport application" });
        }
        return res.json({ success: true, isVerified, message: "Welcome to passport application" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyUser = async (req,res) => {
    try {
        const { name, mobile, gender, dob, email } = req.body;
        if (!name || !mobile || !gender || !dob || !email) {
            return res.json({ success: false, message: "Details Missing" });
        }
        const user = await User.findOne({ email });
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