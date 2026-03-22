import transporter from "../config/nodemailer.js";
import User from "../models/userModel.js";

export const sendOtp = async (req,res) => {
    try {
        const { email } = req.params;
        if (!email) {
            return res.json({ success: faalse, message: "Email missing" });
        }
        const isUserExists = await User.findOne({ email });
        const otp = String(Math.floor(10000000 + Math.random() * 90000000));
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Passport Application email verification",
            text: `Here is your passport application otp, ${otp}`
        };
        if (isUserExists) {
            isUserExists.otp = otp;
            isUserExists.otpExpireAt = Date.now() + 5*60*1000;
        } else {

        }
        await transporter.sendMail(mailOptions);
        return res.json({ success: true, message: "Otp sent to your email" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

export const verifyUserFromOtp = async (req,res) => {
    try {
        const { email, otp } = req.body;
        if (!otp) {
            return res.json({ success: false, message: "Otp missing" });
        }
        const isUserExists = await User.findOne({ email });
        if (!isUserExists) {
            return res.json({ success: true, isUserExists: false, message: "Welcome to passport application" });
        }
        isUserExists.otp = "";
        isUserExists.otpExpireAt = 0;
        await isUserExists.save();
        return res.json({ success: true, isUserExists: true, message: "Welcome back to passport application" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}