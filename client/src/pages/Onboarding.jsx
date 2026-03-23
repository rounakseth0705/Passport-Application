import { useState } from "react";
import clockIcon from "../assets/clock.svg";
import checkIcon from "../assets/check.svg";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
    const { language, setLanguage } = useContext(UserContext);
    const navigate = useNavigate();
    const [hours, setHours] = useState(String(new Date().getHours()).padStart(2,"0"));
    const [minutes, setMinutes] = useState(String(new Date().getMinutes()).padStart(2,"0"));
    const [seconds, setSeconds] = useState(String(new Date().getSeconds()).padStart(2,"0"));
    const [meridiem, setMeridiem] = useState(getMeridiem());
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    function getMeridiem() {

    }
    const saveDetails = (data) => {
        console.log(data);
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
    return(
        <div className="h-screen">
            <div className="flex justify-evenly items-center bg-gray-100 h-[8%] md:justify-between lg:justify-evenly">
                <span className="flex justify-center items-center gap-3 md:ml-[1vw] md:gap-1 lg:gap-3 lg:ml-0">
                    <img src={clockIcon} alt="clockIcon" className="w-6 h-6 md:w-8 md:h-8 lg:w-6 lg:h-6"/>
                    <h1 className="md:text-2xl lg:text-base">{language==="english" ? new Date().toLocaleString("en-US", { weekday: "long" }) : new Date().toLocaleString("hi-IN", { weekday: "long" })}, {language==="english" ? new Date().toLocaleString("en-US", { month: "long" }) : new Date().toLocaleString("hi-IN", { month: "long" })} {String(new Date().getDate()).padStart(2,"0")} {new Date().getFullYear()}, {hours}:{minutes}:{seconds} {meridiem}</h1>
                </span>
                <span>
                    <select onChange={(event) => setLanguage(event.target.value)} className="border p-1">
                        <option value="english">{language==="english" ? "English" : "अंग्रेज़ी"}</option>
                        <option value="hindi">{language==="english" ? "Hindi" : "हिन्दी"}</option>
                    </select>
                </span>
                <h1 onClick={() => navigate("/")} className="hover:underline cursor-pointer md:text-2xl md:mr-[1vw] lg:text-base lg:mr-0">{language==="english" ? "Go back to login page" : "लॉगिन पेज पर वापस जाएं"}</h1>
            </div>
            <div className="flex flex-col justify-between items-center h-[92%] md:flex-row md:items-start">
                <div className="flex flex-col bg-linear-to-r from-blue-500 to-slate-900 w-[45vw] h-full lg:w-[57vw] xl:w-[52vw]">
                    <h1 className="mt-[20vh] text-white text-4xl font-semibold text-center mx-5 lg:text-5xl xl:text-6xl">{language==="english" ? "Let's set up your profile" : "आइए आपकी प्रोफ़ाइल सेट अप करें"}</h1>
                    <h1 className="mt-[1vh] text-white text-center mx-5">{language==="english" ? "Enter a few basic details to get started with your passport application" : "पासपोर्ट आवेदन प्रक्रिया शुरू करने के लिए कुछ बुनियादी विवरण दर्ज करें।"}</h1>
                    <span className="flex flex-col items-start text-white mt-[10vh] mx-auto text-2xl">
                        <span className="flex justify-center items-center gap-2">
                            <img src={checkIcon} alt="checkIcon" className="w-8 h-8"/>
                            <h1>{language==="english" ? "Takes less than a minute" : "इसमें एक मिनट से भी कम समय लगता है"}</h1>
                        </span>
                        <span className="flex justify-center items-center gap-2">
                            <img src={checkIcon} alt="checkIcon" className="w-8 h-8"/>
                            <h1>{language==="english" ? "Helps pre-fill your application" : "आपके आवेदन को पहले से भरने में मदद करता है"}</h1>
                        </span>
                        <span className="flex justify-center items-center gap-2">
                            <img src={checkIcon} alt="checkIcon" className="w-8 h-8"/>
                            <h1>{language==="english" ? "You can edit details later" : "आप बाद में विवरण संपादित कर सकते हैं।"}</h1>
                        </span>
                    </span>
                </div>
                <div className="flex justify-center items-center w-[55vw] h-full lg:w-[43vw] xl:w-[48vw]">
                    <form onSubmit={handleSubmit(saveDetails)} className="flex flex-col justify-center items-start gap-7 shadow-lg rounded-2xl py-10 bg-gray-100 w-[80%]">
                        <div className="flex flex-col justify-center items-start mx-auto">
                            <label htmlFor="name" className="font-semibold mx-5">{language==="english" ? "Full Name" : "पूरा नाम"}</label>
                            <input {...register("name",{
                                required: `${language==="english" ? "Name is required" : "नाम आवश्यक है"}`,
                                minLength: {
                                    value: 3,
                                    message: `${language==="english" ? "Name must contain atleast 3 characters" : "नाम में कम से कम 3 अक्षर होने चाहिए"}`
                                },
                                maxLength: {
                                    value: 20,
                                    message: "Name can be maximum of 20 characters"
                                }
                            })} placeholder={language==="english" ? "enter your name" : "अपना नाम दर्ज करें"} className="bg-gray-300 w-[35vw] py-3 px-6 rounded-3xl lg:w-[30vw] xl:w-[30vw]"/>
                            { errors.name && <span className="text-red-500 mx-5">{errors.name.message}</span> }
                        </div>
                        <div className="flex flex-col justify-center items-start mx-auto">
                            <label htmlFor="mobile" className="font-semibold mx-5">{language==="english" ? "Mobile No." : "मोबाइल नंबर"}</label>
                            <input {...register("mobile",{
                                required: `${language==="english" ? "Mobile no. is required" : "मोबाइल नंबर आवश्यक है"}`,
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: `${language==="english" ? "Enter a valid INDIAN mobile no." : "एक वैध भारतीय मोबाइल नंबर दर्ज करें।"}`
                                }
                            })} placeholder={language==="english" ? "enter your mobile no." : "अपना मोबाइल नंबर दर्ज करें।"} className="bg-gray-300 w-[35vw] py-3 px-6 rounded-3xl lg:w-[30vw] xl:w-[30vw]"/>
                            { errors.mobile && <span className="text-red-500 mx-5">{errors.mobile.message}</span> }
                        </div>
                        <div className="flex justify-center items-start gap-3 mx-auto">
                            <h1 className="font-semibold">{language==="english" ? "Gender" : "लिंग"}</h1>
                            <select className="border p-1 rounded">
                                <option value="male">{language==="english" ? "Male" : "पुरुष"}</option>
                                <option value="female">{language==="english" ? "Female" : "महिला"}</option>
                                <option value="other">{language==="english" ? "Other" : "अन्य"}</option>
                            </select>
                        </div>
                        <div className="mx-auto">
                            <input type="date" {...register("date",{
                                required: `${language==="english" ? "Date of Birth is required" : "जन्म तिथि आवश्यक है"}`
                            })} className="border p-1 rounded"/>
                        </div>
                        <button className="bg-slate-800 text-white rounded-3xl mx-auto px-20 py-3 cursor-pointer hover:bg-slate-700 transition-all duration-500 ease-in-out">{language==="english" ? "Continue" : "जारी रखें"}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Onboarding;