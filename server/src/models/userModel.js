import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 20 },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    gender: { type: String, enum: ["Male","Female","Other"], required: true },
    city: { type: String, required: true },
    otp: { type: String, default: "" },
    otpExpireAt: { type: Date, default: 0 }
});

const User = mongoose.model("user",userSchema);

export default User;