import { createContext, useEffect } from "react";
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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const sendOtp = async (userEmail) => {
        try {
            setEmail(userEmail);
            setIsUserVerifying(true);
            const response = await API.post("/user/send-otp", { email: userEmail });
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
            const response = await API.put("/user/check-otp", { email, otp });
            if (response) {
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token);
                    if (response.data.isVerified) {
                        navigate("user-dashboard");
                        toast.success(response.data.message);
                    } else {
                        navigate("onboarding");
                        toast.success(response.data.message);
                    }
                    setEmail("");
                    setIsUserVerifying(false);
                    setIsLoggedIn(true);
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
    const logout = () => {
        try {
            setIsLoggedIn(false);
            setUser(null);
        } catch(error) {
            toast.error(error.message);
        }
    }
    const checkUser = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            const response = await API.get("/user/check-user");
            if (response) {
                if (response.data.success) {
                    setUser(response.data.user);
                    setIsLoggedIn(true);
                } else {
                    logout();
                }
            }
        } catch(error) {
            logout();
        }
    }
    const verifyUser = async (name,mobile,gender,dob) => {
        try {
            const response = await API.put("/user/verify-user", { name, mobile, gender, dob });
            if (response) {
                if (response.data.success) {
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
    useEffect(() => {
        checkUser();
    },[]);
    const value = { sendOtp, verifyUser, isUserVerifying, language, setLanguage, checkOtp, user, isLoggedIn }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;