import { createContext } from "react";
import API from "../config/api.js";
import { useState } from "react";

export const ApplicationContext = createContext();

const ApplicationContextProvider = ({ children }) => {
    const [isApplicationExists, setIsApplicationExists] = useState(false);
    const checkApplication = async () => {
        try {
            const response = await API.get("/check-application");
            if (response) {
                if (response.data.success) {
                    if (response.data.isApplicationExists) {
                        setIsApplicationExists(true);
                    } else {
                        setIsApplicationExists(false);
                    }
                }
            } else {

            }
        } catch(error) {

        }
    }
    const value = { checkApplication, isApplicationExists };
    return(
        <ApplicationContext.Provider value={value}>
            {children}
        </ApplicationContext.Provider>
    )
}

export default ApplicationContextProvider;