import { Outlet } from "react-router-dom";
import UserContextProvider from "./context/UserContext.jsx";

const App = () => {
    return(
        <>
            <UserContextProvider>
                <Outlet/>
            </UserContextProvider>
        </>
    )
}

export default App;