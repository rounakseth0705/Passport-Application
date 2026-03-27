import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    name: { type: String },
    mobile: { type: String, unique: true },
    gender: { type: String, enum: ["Male","Female"] },
    dob: { type: Date },
    
});

const Application = mongoose.model("application", applicationSchema);

export default Application;