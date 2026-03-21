import { useForm } from "react-hook-form";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: "onBlur" });
    const submitForm = (data) => {
        console.log(data);
    }
    return(
        <div className="flex flex-col items-center">
            <div className="mt-12">
                <h1 className="my-2 text-center font-semibold text-2xl sm:text-4xl xl:text-5xl">Apply for Your Passport Online</h1>
                <h1 className="text-center text-sm sm:text-base">Complete your passport application in a few simple steps - fast, secure, and hassle-free.</h1>
            </div>
            <span className="mt-10 sm:mt-15 lg:mt-12">
                <h1 className="font-semibold sm:text-2xl">Steps:</h1>
                <h1 className="text-sm sm:text-base">1. Fill Your Details - (Enter your personal and address information)</h1>
                <h1 className="text-sm sm:text-base">2. Upload Documents - (Submit required ID and photo)</h1>
                <h1 className="text-sm sm:text-base">3. Book Appointment - (Choose a date and time slot)</h1>
            </span>
            <h1 className="mt-8 font-semibold sm:mt-10 md:text-2xl">Secure process • Takes 10-15 minutes • No paperwork hassle</h1>
            <form onSubmit={handleSubmit(submitForm)} className="flex flex-col items-center gap-5 mt-15 bg-gray-100 shadow-xl rounded py-5 px-4 sm:px-10">
                <div className="flex flex-col justify-center">
                    <label htmlFor="mobileNo" className="px-5">Mobile no.</label>
                    <input {...register("mobile",{
                        required: "Mobile number is required",
                        pattern: {
                            value: /^[6-9]\d{9}$/,
                            message: "Enter a valid INDIAN mobile number"
                        }
                    })} placeholder="enter mobile number, e.g. 9876543210" className={`bg-gray-300 ${errors.mobile ? "border-red-500" : ""} px-5 py-3 w-80 rounded-4xl sm:w-120`}/>
                    { errors.mobile && <span className="text-red-500 px-5">{errors.mobile.message}</span> }
                </div>
                <button className="px-12 py-2 bg-black text-white cursor-pointer rounded-3xl">Get OTP</button>
            </form>
        </div>
    )
}

export default LoginPage;