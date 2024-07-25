"use client"

import { useState, useRef, useEffect } from "react"
import { FieldError } from "react-hook-form";
interface InputOTPProps {
    length: number;
    onOTPChange: (otp: string) => void;
    errors?: FieldError;
}

const InputOTP: React.FC<InputOTPProps> = ({ length, onOTPChange, errors }) => {
    const [otp, setOTP] = useState<string[]>(new Array(length).fill(""))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])

    useEffect(() => {
        // Tạo mảng ký tự từ mảng các ô nhập
        const otpString = otp.join("")
        onOTPChange(otpString)
    }, [otp, onOTPChange]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.target.value;
        if (value.length > 1) {
            // Đảm bảo mỗi ô nhập chỉ có 1 ký tự
            e.preventDefault();
            return;
        }
    };

    const handleInputKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        const value = e.key;
        if (e.ctrlKey && value.toLowerCase() === 'v') {
            navigator.clipboard.readText().then(clipText => {
                const pastedDataArray = clipText.split('');
                if (pastedDataArray.length > length) {
                    pastedDataArray.length = length;
                }
                setOTP(prevOTP => [...pastedDataArray, ...prevOTP.slice(pastedDataArray.length)]);
            });
        }
        
        if (!/^[0-9]$/.test(value) && e.key !== "Backspace") {
            // Chỉ cho phép nhập ký tự số hoặc sử dụng phím backspace (key code 8)
            e.preventDefault();
            return;
        }

        if (value !== "" && index < length - 1) {
            // Tự động chuyển sang ô nhập tiếp theo khi điền đủ 1 ký tự
            inputRefs.current[index + 1]?.focus()
        }

        if (e.key === "Backspace") {
            // Handle backspace key
            const newOTP = [...otp];
            newOTP[index] = "";
            setOTP(newOTP);
            if (newOTP[index] === "") {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (/^[0-9]$/.test(value)) {
            const newOTP = [...otp];
            newOTP[index] = value;
            setOTP(newOTP);

            if (index < length - 1) {
                // Tự động chuyển sang ô nhập tiếp theo khi điền đủ 1 ký tự
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="flex w-full justify-between">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        onKeyDown={(e) => handleInputKeyDown(e, index)}
                        maxLength={1}
                        className={`
                            w-14 
                            h-14 
                            px-2 
                            py-2 
                            text-center 
                            border 
                            rounded-md 
                            bg-inherit 
                            text-gray-300 
                            border-gray-300 
                            text-xl 
                            font-semibold 
                            focus:ring-0  
                            ${errors ? "border border-red-500" : ""}
                        `}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>
            {errors && (
                <p className="text-red-500 font-medium h-4">
                    {errors?.message?.toString()}
                </p>
            )}
        </div>
    );
};

export default InputOTP;
