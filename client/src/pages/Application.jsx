import clockIcon from "../assets/clock.svg";
import { useForm } from "react-hook-form";
import filledDotIcon from "../assets/filledDot.svg";
import voidDotIcon from "../assets/voidDot.svg";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useEffect } from "react";
import { useState } from "react";
import angleRightArrow from "../assets/angleRightArrow.svg";
import angleLeftArrow from "../assets/angleLeftArrow.svg";
import { useNavigate } from "react-router-dom";

const Application = () => {
    const { user } = useContext(UserContext);
    const [step, setStep] = useState(1);
    const [gender, setGender] = useState("Male");
    const [hours, setHours] = useState(String(new Date().getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2,"0"));
    const [seconds, setSeconds] = useState(String(new Date().getSeconds()).padStart(2,"0"));
    const [meridiem, setMeridiem] = useState(getMeridiem());
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm({ defaultValues: "", mode: "onBlur" });
    function getMeridiem() {

    }
    const submitApplication = (data,event) => {
        const action = event.nativeEvent.submitter.name;
        if (action === "next") {
            setStep((prev) => {
                if (prev < 4) {
                    return prev+1;
                } else {
                    return prev;
                }
            });
        } else {
            setStep((prev) => {
                if (prev > 1) {
                    return prev-1;
                }
            })
        }
    }
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
    useEffect(() => {
        if (user) {
            reset({ name: user.name, mobile: user.mobile, email: user.email });
        }
    },[user]);
    return(
        <div className="h-screen">
            <div className="flex justify-evenly items-center h-[8%] w-screen bg-gray-300">
                <span className="flex justify-center items-center gap-3 md:ml-[1vw] md:gap-1 lg:gap-3 lg:ml-0">
                    <img src={clockIcon} alt="clockIcon" className="w-6 h-6 md:w-8 md:h-8 lg:w-6 lg:h-6"/>
                    <h1 className="md:text-2xl lg:text-base">{new Date().toLocaleString("en-US", { weekday: "long" })}, {new Date().toLocaleString("en-US", { month: "long" })} {String(new Date().getDate()).padStart(2,"0")} {new Date().getFullYear()}, {hours}:{minutes}:{seconds} {meridiem}</h1>
                </span>
                <h1 onClick={() => navigate("/user-dashboard")} className="cursor-pointer hover:underline">Go back to dashboard</h1>
            </div>
            <div className="flex justify-between h-[92%]">
                <div className="flex flex-col justify-start w-[45vw] bg-linear-to-r from-blue-500 to-slate-950 text-white pl-[3vw]">
                    <h1 className="text-6xl font-semibold mt-[15vh]">Passport Application</h1>
                    <div className="mt-[5vh]">
                        <h1 className="text-center">Step 1 of 4</h1>
                        <span className="flex justify-center items-center gap-2 mt-[2vh]">
                            { step === 1 ?
                                <img src={filledDotIcon} alt="filledDotIcon" className="w-5 h-5"/> :
                                <img src={voidDotIcon} alt="voidDotIcon" className="w-5 h-5"/>
                            }
                            { step === 2 ?
                                <img src={filledDotIcon} alt="filledDotIcon" className="w-5 h-5"/> :
                                <img src={voidDotIcon} alt="voidDotIcon" className="w-5 h-5"/>
                            }
                            { step === 3 ?
                                <img src={filledDotIcon} alt="filledDotIcon" className="w-5 h-5"/> :
                                <img src={voidDotIcon} alt="voidDotIcon" className="w-5 h-5"/>
                            }
                            { step === 4 ?
                                <img src={filledDotIcon} alt="filledDotIcon" className="w-5 h-5"/> :
                                <img src={voidDotIcon} alt="voidDotIcon" className="w-5 h-5"/>
                            }
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-[55vw] pl-[5vw]">
                    <h1 className="">Personal Details</h1>
                    <h1 className="">Enter your personal information as per official records.</h1>
                    <form onSubmit={handleSubmit(submitApplication)} className="flex flex-col items-center gap-8 rounded-2xl py-3 bg-gray-100 shadow-lg w-[40vw]">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col justify-center items-start gap-1">
                                <label htmlFor="name" className="pl-6">Name</label>
                                <input {...register("name")} placeholder="enter your name" className="bg-gray-300 rounded-4xl py-4 px-6 w-[30vw]"/>
                            </div>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <label htmlFor="mobile" className="pl-6">Mobile No.</label>
                            <input {...register("mobile")} placeholder="enter your mobile no." className="bg-gray-300 rounded-4xl py-4 px-6 w-[30vw]"/>
                        </div>
                        <div className="flex flex-col justify-center items-start gap-1">
                            <label htmlFor="email" className="pl-6">Email ID</label>
                            <input {...register("email")} placeholder="enter your email id" className="bg-gray-300 rounded-4xl py-4 px-6 w-[30vw]"/>
                        </div>
                        <div className="flex items-center">
                            <span className="flex justify-start items-center gap-6">
                                <label htmlFor="dob" className="pl-6">Date of Birth</label>
                                <input type="date" {...register("dob")} className="bg-gray-300 rounded-3xl px-4 py-2"/>
                            </span>
                            <span className="flex justify-start items-center gap-6">
                                <h1 className="pl-6">Gender</h1>
                                <select className="border p-1 rounded" onChange={(event) => setGender(event.target.value)}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                </select>
                            </span>
                        </div>
                </div>
                    <div className="flex gap-30">
                        { step > 1 &&
                            <button name="back" className="flex justify-center items-center gap-1 bg-slate-800 text-white px-2 py-1 rounded cursor-pointer hover:bg-slate-700 transition-all duration-500">
                                <img src={angleLeftArrow} alt="angleLeftArrow" className="w-5 h-5"/>
                                <h1>Back</h1>
                            </button>
                        }
                        <button name="next" className="flex justify-center items-center gap-1 bg-slate-800 text-white px-2 py-1 rounded cursor-pointer hover:bg-slate-700 transition-all duration-500">
                            <h1>Next</h1>
                            <img src={angleRightArrow} alt="angleRightArrow" className="w-5 h-5"/>
                        </button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}

export default Application;