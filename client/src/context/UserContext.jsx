import { createContext } from "react";
import API from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const sendOtp = async () => {
        try {
            const response = await API.get(`/send-otp/${email}`);
            if (response) {
                if (response.data.success) {
                
                }
            }
        } catch(error) {

        }
    }
    const verifyUser = async () => {

    }
    const value = { sendOtp, setEmail, verifyUser }
    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;