import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useState } from "react";
import clockIcon from "../assets/clock.svg";
import { useEffect } from "react";
import fileIcon from "../assets/file.svg";
import { ApplicationContext } from "../context/ApplicationContext.jsx";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const UserDashboard = () => {
    const { user, logout } = useContext(UserContext);
    const { isApplicationExists } = useContext(ApplicationContext);
    const navigate = useNavigate();
    const [hours, setHours] = useState(String(new Date().getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2,"0"));
    const [seconds, setSeconds] = useState(String(new Date().getSeconds()).padStart(2,"0"));
    const meridiem = useRef(hours < 12 ? "AM" : "PM");
    useEffect(() => {
        const interval = setInterval(() => {
            setHours(String(new Date().getHours()).padStart(2,"0"));
            setMinutes(String(new Date().getMinutes()).padStart(2,"0"));
            setSeconds(String(new Date().getSeconds()).padStart(2,"0"));
        },1000);
        return () => {
            clearInterval(interval);
        }
    },[]);
    return(
        <div className="bg-blue-400">
            <div className="flex justify-evenly items-center bg-gray-200 py-3">
                <h1>Welcome back, {user?.name.split(" ")[0]}</h1>
                <span className="flex justify-center items-center gap-3 md:ml-[1vw] md:gap-1 lg:gap-3 lg:ml-0">
                    <img src={clockIcon} alt="clockIcon" className="w-6 h-6 md:w-8 md:h-8 lg:w-6 lg:h-6"/>
                    <h1 className="md:text-2xl lg:text-base">{new Date().toLocaleString("en-US", { weekday: "long" })}, {new Date().toLocaleString("en-US", { month: "long" })} {String(new Date().getDate()).padStart(2,"0")} {new Date().getFullYear()}, {hours}:{minutes}:{seconds} {meridiem.current}</h1>
                </span>
                <button onClick={logout} className="cursor-pointer py-2 px-5 rounded-3xl text-white bg-slate-800 hover:bg-slate-700 transition-all duration-500 ease-in-out">Logout</button>
            </div>
            <h1 className="text-center text-4xl font-semibold py-5 text-slate-800">Complete your passport application in a few simple steps.</h1>
            <div className="flex justify-center items-center my-5">
                { !isApplicationExists ?
                    <button onClick={() => navigate("/application")} className="flex justify-evenly items-center gap-2 py-7 px-7 bg-white hover:bg-linear-to-r hover:from-blue-600 hover:to-slate-800 hover:text-white transition-all duration-300 ease-in-out text-3xl cursor-pointer rounded-2xl shadow-lg text-slate-800">
                        <img src={fileIcon} alt="fileIcon" className="w-10 h-10"/>
                        <h1>Start New Application</h1>
                    </button> :
                    <button className="flex justify-evenly items-center gap-2 py-7 px-7 bg-white hover:bg-linear-to-r hover:from-blue-600 hover:to-slate-800 hover:text-white transition-all duration-300 ease-in-out text-3xl cursor-pointer rounded-2xl shadow-lg text-slate-800">
                        <img src={fileIcon} alt="fileIcon" className="w-10 h-10"/>
                        <h1>Resume Application</h1>
                    </button>
                }
            </div>
        </div>
    )
}

export default UserDashboard;