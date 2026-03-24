import { createContext } from "react";
import API from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isUserVerifying, setIsUserVerifying] = useState(false);
    const [language, setLanguage] = useState("english");
    const [user, setUser] = useState(null);
    const sendOtp = async (userEmail) => {
        try {
            setEmail(userEmail);
            setIsUserVerifying(true);
            const response = await API.get("/send-otp", { email: userEmail });
            if (response) {
                if (response.data.success) {
                    toast.success(response.data.message);
                } else {
                    setEmail("");
                    setIsUserVerifying(false);
                    toast.error(response.data.message);
                }
            } else {
                setEmail("");
                setIsUserVerifying(false);
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const checkOtp = async (otp) => {
        try {
            const response = await API.post("/check-otp", { email, otp });
            if (response) {
                if (response.data.success) {
                    if (response.data.isVerified) {
                        navigate("user-dashboard");
                        toast.success(response.data.message);
                    } else {
                        navigate("onboarding");
                        toast.success(response.data.message);
                    }
                    setIsUserVerifying(false);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const verifyUser = async (name,mobile,gender,dob) => {
        try {
            const response = await API.put("/verify-user", { name, mobile, gender, dob, email });
            if (response) {
                if (response.data.success) {
                    setEmail("");
                    setUser(response.data.user);
                    navigate("/user-dashboard");
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } else {
                toast.error("Something went wrong!");
            }
        } catch(error) {
            toast.error(error.message);
        }
    }
    const value = { sendOtp, verifyUser, isUserVerifying, language, setLanguage, checkOtp }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;