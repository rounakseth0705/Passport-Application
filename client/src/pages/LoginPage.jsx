import { useContext } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext.jsx";

const LoginPage = () => {
    const { setEmail, sendOtp } = useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const submitForm = (data) => {
        console.log(data);
    }
    return(
        <div className="flex flex-col h-screen gap-12 lg:flex-row lg:gap-6 xl:gap-10">
            <div className="flex flex-col items-center w-[screen] bg-linear-to-r from-blue-500 to-slate-900 rounded-b-[25vw] sm:h-[60vh] lg:w-[66vw] lg:h-screen lg:pl-[1vw] lg:items-start lg:rounded-r-full xl:w-[66vw]">
                <div className="text-white sm:mt-20 lg:mt-22 lg:mx-[2vw] xl:mt-35 xl:mx-[2.5vw]">
                    <h1 className="text-2xl font-semibold text-center sm:text-4xl md:text-5xl lg:text-left lg:text-4xl xl:text-5xl">Apply for Your Passport Online</h1>
                    <h1 className="my-2 text-center lg:text-left">Complete your passport application in a few simple steps - fast, secure, and hassle-free.</h1>
                </div>
                <span className="mt-[6vh] text-white lg:mx-[2vw] xl:mx-[2.5vw]">
                    <h1 className="text-3xl font-semibold my-3">How it works</h1>
                    <span className="">
                        <h1>1. Fill Your Details</h1>
                        <h1 className="pl-4.5">Enter your personal and address information</h1>
                    </span>
                    <span className="">
                        <h1>2. Upload Documents</h1>
                        <h1 className="pl-4.5">Submit required ID and photo</h1>
                    </span>
                    <span className="">
                        <h1>3. Book Appointment</h1>
                        <h1 className="pl-4.5">Choose a date and time slot</h1>
                    </span>
                </span>
                <h1 className="mt-10 font-semibold text-white md:mx-[1vw] sm:text-2xl lg:mx-[2vw] xl:mx-[2.5vw] xl:mt-20">Secure • Takes 10-15 minutes • No paperwork</h1>
            </div>
            <div className="flex justify-center items-center w-screen lg:w-[25vw] lg:justify-start">
                <form onSubmit={handleSubmit(submitForm)} className="flex flex-col justify-center items-center gap-6 bg-gray-100 shadow-lg rounded-2xl py-9 px-5">
                    <div className="flex flex-col justify-center items-center lg:items-start">
                        <label htmlFor="mobileNo" className="text-3xl mx-5 my-3 text-slate-800 font-semibold sm:text-4xl lg:text-3xl">Email ID</label>
                        <input {...register("email",{
                        required: "Email ID is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid Email Id"
                        }
                    })} placeholder="enter your email, e.g. abc@gmail.com" className="px-6 py-4 w-[50vw] bg-gray-200 rounded-4xl sm:w-[60vw] lg:w-[26vw] lg:px-4 xl:px-6"/>
                    { errors.email && <span className="text-red-500 px-5">{errors.email.message}</span> }
                    </div>
                    <h1 className="text-slate-800">We'll send a one-time password to your email</h1>
                    <button className="px-23 py-3 bg-slate-800 text-white cursor-pointer rounded-3xl hover:bg-slate-700 transition-all duration-500 ease-in-out">Get OTP</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;