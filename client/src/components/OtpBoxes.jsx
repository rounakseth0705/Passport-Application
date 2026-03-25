import { useEffect, useRef, useState } from "react";

const OtpBoxes = ({ otpLength, setOtp }) => {
    const [inputArray, setInputArray] = useState(new Array(otpLength).fill(""));
    const inputRef = useRef([]);
    const handleChange = (event,index) => {
        const value = event.target.value.trim();
        if (isNaN(value)) {
            return;
        }
        let newInputArray = [...inputArray];
        newInputArray[index] = value.slice(-1);
        setInputArray(newInputArray);
        if (value && index < otpLength-1) {
            inputRef.current[index+1]?.focus();
        }
        setOtp(newInputArray.join(""));
    }
    const handleKeyDown = (event,index) => {
        if (event.key === "Backspace" && !event.target.value) {
            inputRef.current[index-1].focus();
        }
    }
    useEffect(() => {
        inputRef.current[0].focus();
    },[]);
    return(
        <div className="flex lg:mx-7 xl:mx-8">
            {
                inputArray.map((value,index) => (
                    <input key={index} ref={(input) => inputRef.current[index] = input} onChange={(event) => handleChange(event,index)} value={inputArray[index]} onKeyDown={(event) => handleKeyDown(event,index)} type="text" className="h-11 w-11 rounded m-[0.5vw] text-center border p-1 text-2xl xl:h-12 xl:w-12"/>
                ))
            }
        </div>
    )
}

export default OtpBoxes;