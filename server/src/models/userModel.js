import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 20 },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    gender: { type: String, enum: ["Male","Female","Other"] },
    dob: { type: Date,  },
    city: { type: String },
    otp: { type: String, default: "" },
    otpExpireAt: { type: Date, default: 0 },
    isVerified: { type: Boolean, default: false }
});

const User = mongoose.model("user",userSchema);

export default User;