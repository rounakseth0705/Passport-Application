import mongoose from "mongoose";

const connectToDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Database connected")).catch((error) => console.log(error.message));
    } catch(error) {
        console.log(error.message);
    }
}

export default connectToDB;