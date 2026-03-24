import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserContextProvider from "./context/UserContext.jsx";

const App = () => {
    return(
        <>
            <UserContextProvider>
                <Toaster/>
                <Outlet/>
            </UserContextProvider>
        </>
    )
}

export default App;