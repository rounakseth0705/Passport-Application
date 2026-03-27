import Application from "../models/applicationModel.js";

export const isApplicationExists = async (req,res) => {
    try {
        const userId = req.user._id;
        if (!userId) {
            return res.json({ success: false, message: "Something went wrong!" });
        }
        const application = await Application.findOne({ userId });
        if (!application) {
            return res.json({ success: true, isApplicationExists: false, message: "No application exists" });
        }
        return res.json({ success: true, isApplicationExists: true, application, message: "Application exists" });
    } catch(error) {
        console.log(error.message);
        return res.json({ success: false, message: error.message });
    }
}

// export const saveStep1Details = async (req,res) => {
//     try {
//         const { name, mobile, email, gender, dob } = req.body;
//         if (!name || !mobile || !email || !gender || !dob) {

//         }
//     } catch(error) {
//         console.log(error.message);
//         return res.json({ success: false, message: error.message });
//     }
// }