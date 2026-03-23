import { createContext } from "react";
import API from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isUserVerifying, setIsUserVerifying] = useState(false);
    const [language, setLanguage] = useState("english");
    const sendOtp = async (userEmail) => {
        try {
            setEmail(userEmail);
            setIsUserVerifying(true);
            const response = await API.get(`/send-otp/${userEmail}`);
            if (response) {
                if (response.data.success) {
                
                } else {
                    setEmail("");
                    setIsUserVerifying(false);
                }
            } else {
                setEmail("");
                setIsUserVerifying(false);
            }
        } catch(error) {

        }
    }
    const verifyUser = async (otp) => {
        try {
            const response = await API.post("/verify-user", { otp });
            if (response) {
                if (response.data.success) {
                    if (response.data.isUserExists) {
                        setEmail("");
                    } else {
                        navigate("onboarding");
                    }
                    setIsUserVerifying(false);
                } else {

                }
            }
        } catch(error) {

        }
    }
    const value = { sendOtp, verifyUser, isUserVerifying, language, setLanguage }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;