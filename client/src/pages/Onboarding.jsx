import { useState } from "react";
import clockIcon from "../assets/clock.svg";
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
            <div className="flex justify-evenly items-center bg-gray-100 h-[8%]">
                <span className="flex justify-center items-center gap-3 md:gap-2 lg:gap-3">
                    <img src={clockIcon} alt="clockIcon" className="w-6 h-6 md:w-8 md:h-8 lg:w-6 lg:h-6"/>
                    <h1 className="md:text-2xl lg:text-base">{language==="english" ? new Date().toLocaleString("en-US", { weekday: "long" }) : new Date().toLocaleString("hi-IN", { weekday: "long" })}, {language==="english" ? new Date().toLocaleString("en-US", { month: "long" }) : new Date().toLocaleString("hi-IN", { month: "long" })} {String(new Date().getDate()).padStart(2,"0")} {new Date().getFullYear()}, {hours}:{minutes}:{seconds} {meridiem}</h1>
                </span>
                <span>
                    <select onChange={(event) => setLanguage(event.target.value)} className="border p-1">
                        <option value="english">English</option>
                        <option value="hindi">हिन्दी</option>
                    </select>
                </span>
                <h1 onClick={() => navigate("/")} className="hover:underline cursor-pointer">{language==="english" ? "Go back to login page" : "लॉगिन पेज पर वापस जाएं"}</h1>
            </div>
            <div className="flex flex-col justify-between items-center h-[92%] md:flex-row md:items-start">
                <div className="flex flex-col bg-linear-to-r from-blue-500 to-slate-900 w-[45vw] h-full xl:w-[48vw]">
                    <h1 className="mt-[20vh] text-white text-4xl font-semibold text-center xl:text-5xl">{language==="english" ? "Let's set up your profile" : "आइए आपकी प्रोफ़ाइल सेट अप करें"}</h1>
                    <h1 className="mt-[1vh] text-white text-center">{language==="english" ? "Enter a few basic details to get started with your passport application" : "पासपोर्ट आवेदन प्रक्रिया शुरू करने के लिए कुछ बुनियादी विवरण दर्ज करें।"}</h1>
                    <span className="flex flex-col items-start text-white mt-[10vh]">
                        <h1>1. {language==="english" ? "Takes less than a minute" : "इसमें एक मिनट से भी कम समय लगता है"}</h1>
                        <h1>2. {language==="english" ? "Helps pre-fill your application" : "आपके आवेदन को पहले से भरने में मदद करता है"}</h1>
                        <h1>3. {language==="english" ? "You can edit details later" : "आप बाद में विवरण संपादित कर सकते हैं।"}</h1>
                    </span>
                </div>
                <div className="flex justify-center items-center w-[55vw] h-full xl:w-[52vw]">
                    <form className="flex flex-col justify-center items-start gap-8 shadow-lg rounded-2xl py-10 bg-gray-50 w-[80%]">
                        <div className="flex flex-col justify-center items-start mx-8 lg:mx-20">
                            <label htmlFor="name">{language==="english" ? "Full Name" : "पूरा नाम"}</label>
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
                            })} placeholder={language==="english" ? "enter your name" : "अपना नाम दर्ज करें"} className="bg-gray-200 w-[35vw] py-3 px-6 rounded-3xl lg:w-[30vw]"/>
                            { errors.name && <span className="text-red-500">{errors.name.message}</span> }
                        </div>
                        <div className="flex flex-col justify-center items-start mx-8 lg:mx-20">
                            <label htmlFor="mobile">Mobile No.</label>
                            <input {...register("mobile",{
                                required: `${language==="english" ? "Mobile no. is required" : "मोबाइल नंबर आवश्यक है"}`,
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: `${language==="english" ? "Enter a valid INDIAN mobile no." : "एक वैध भारतीय मोबाइल नंबर दर्ज करें।"}`
                                }
                            })} placeholder={language==="english" ? "enter your mobile no." : "अपना मोबाइल नंबर दर्ज करें।"} className="bg-gray-200 w-[35vw] py-3 px-6 rounded-3xl lg:w-[30vw]"/>
                            { errors.mobile && <span className="text-red-500">{errors.mobile.message}</span> }
                        </div>
                        <div className="flex flex-col justify-center items-start mx-8 lg:mx-20">
                            <h1>{language==="english" ? "Gender" : "लिंग"}</h1>
                            <select className="border p-1">
                                <option value="male">{language==="english" ? "Male" : "पुरुष"}</option>
                                <option value="female">{language==="english" ? "Female" : "महिला"}</option>
                                <option value="other">{language==="english" ? "Other" : "अन्य"}</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Onboarding;