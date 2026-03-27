import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/UserContext.jsx";
import ApplicationContextProvider from "./context/ApplicationContext.jsx";

const App = () => {
    return(
        <>
            <UserContextProvider>
                <ApplicationContextProvider>
                    <Toaster/>
                    <Outlet/>
                </ApplicationContextProvider>
            </UserContextProvider>
        </>
    )
}

export default App;