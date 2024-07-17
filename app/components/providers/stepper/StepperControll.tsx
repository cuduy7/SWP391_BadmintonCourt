"use client"

import { GlobalContext } from "@/contexts";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { Loading } from "../loader";

export default function StepperControl({
    handleClick, currentStep, steps
}: {
    handleClick: (action: string) => void, currentStep: number, steps: string[]
}): JSX.Element {
    const router = useRouter()
    const { setUser, isLoading } = useContext(GlobalContext) || {}

    const handleComplete = (event: React.MouseEvent<HTMLButtonElement>) => {
        router.push("/");
        event.preventDefault()
    };

    const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
        const userData = JSON.parse(localStorage.getItem('user')!) || {};
        if (setUser) setUser(userData);
        handleClick("back");
        event.preventDefault()
    };

    return (
        <div className="container mt-4 mb-8 flex sm:justify-end justify-center gap-5">
            {currentStep > 1 && (
                <button
                    onClick={handleBack}
                    className={`
                        cursor-pointer 
                        rounded-lg 
                        border-2 
                        border-slate-300 
                        bg-white 
                        py-3 
                        px-10 
                        font-semibold 
                        text-primary-blue-cus 
                        transition-all 
                        duration-500 
                        ease-in-out 
                        hover:bg-slate-700 
                        hover:text-white
                    `}
                    type="button"
                >
                    Quay Lại
                </button>
            )}

            {currentStep < steps.length ? (
                <button
                    onClick={() => handleClick("next")}
                    className="
                        cursor-pointer 
                        rounded-lg
                        border-2 
                        bg-primary-blue-cus 
                        py-3 
                        px-10 
                        font-semibold 
                        text-white 
                        transition-all 
                        duration-500 
                        ease-in-out 
                        hover:bg-orange-500 
                        hover:text-white
                    "
                    type="submit"
                >
                    {isLoading ? (
                        <Loading
                            loading={isLoading}
                            color="white"
                        />
                    ) : (
                        "Tiếp theo"
                    )}
                </button>
            ) : (
                <button
                    onClick={handleComplete}
                    className="
                        cursor-pointer 
                        rounded-lg
                        border-2 
                        bg-primary-blue-cus 
                        py-3 
                        px-10 
                        font-semibold 
                        text-white 
                        transition-all 
                        duration-500 
                        ease-in-out 
                        hover:bg-orange-500 
                        hover:text-white
                    "
                    type="submit"
                >
                    {isLoading ? (
                        <Loading
                            loading={isLoading}
                            color="white"
                        />
                    ) : (
                        "Hoàn Thành"
                    )}
                </button>
            )}
        </div>
    );
}
