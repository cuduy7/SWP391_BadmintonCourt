"use client"

import { LocationStep, SkillStep, StylePlayStep, SuggestPlayerStep } from "./steps";
import { StepperControl, StepperHorizontal } from "../../providers";
import { useForm } from 'react-hook-form';
import { GlobalContext } from '@/contexts';
import { useContext, useEffect, useState } from "react";
import { postPlayLevelService, postPlayWayService, postPlaygroundService } from "@/services/step";
import { toast } from "react-toastify";
import { StepFormData } from "@/types";

const StepperHorizontalContent = ({ }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    useEffect(() => {
        const savedStep = localStorage.getItem('selectedStep');
        if (savedStep) {
            setCurrentStep(Number(savedStep));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedStep', String(currentStep));
    }, [currentStep]);

    const steps = [
        "Chọn khu vực của bạn",
        "Kỹ năng",
        "Lối chơi",
        "Gợi ý người chơi",
    ];

    const { setIsLoading, user, setUser } = useContext(GlobalContext) || {}
    const { handleSubmit } = useForm<StepFormData>()

    //console.log("global user", user);

    const onSubmitLocation = async () => {
        if (setIsLoading) setIsLoading(true);

        const userData = JSON.parse(localStorage.getItem('user')!)

        if (JSON.stringify(userData.playingArea) === JSON.stringify(user?.playingArea)) {
            if (setIsLoading) setIsLoading(false)
            return Promise.resolve()
        }

        if (user && user.id && user.playingArea) {
            const res = await postPlaygroundService({ userID: user.id, grounds: user.playingArea })

            //console.log("Playing Area: ", res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (setUser) {
                setUser(prevUser => {
                    const updatedUser = { ...prevUser, playingArea: user.playingArea }
                    localStorage.setItem("user", JSON.stringify(updatedUser))
                    return updatedUser
                })
            }
        }
    }

    const onSubmitSkill = async () => {
        if (setIsLoading) setIsLoading(true)

        const userData = JSON.parse(localStorage.getItem('user')!)

        if (JSON.stringify(userData.playingLevel) === JSON.stringify(user?.playingLevel)) {
            if (setIsLoading) setIsLoading(false)
            return Promise.resolve()
        }

        if (user && user.id && user.playingLevel) {
            const res = await postPlayLevelService({ userID: user.id, levels: user.playingLevel })

            //console.log("Playing Level: ", res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (setUser) {
                setUser(prevUser => {
                    const updatedUser = { ...prevUser, playingLevel: user.playingLevel }
                    localStorage.setItem("user", JSON.stringify(updatedUser))
                    return updatedUser
                })
            }
        }
    }

    const onSubmitStylePlay = async () => {
        if (setIsLoading) setIsLoading(true);

        const userData = JSON.parse(localStorage.getItem('user')!)

        if (JSON.stringify(userData.playingWay) === JSON.stringify(user?.playingWay)) {
            if (setIsLoading) setIsLoading(false)
            return Promise.resolve()
        }

        if (user && user.id && user.playingWay) {
            const res = await postPlayWayService({ userID: user.id, ways: user.playingWay })

            //console.log("Playing Way: ", res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (setUser) {
                setUser(prevUser => {
                    const updatedUser = { ...prevUser, playingWay: user.playingWay }
                    localStorage.setItem("user", JSON.stringify(updatedUser))
                    return updatedUser
                })
            }
        }
    }

    const onSubmitSuggestPlayer = async () => {
        if (setIsLoading) setIsLoading(true);

        //console.log("Submit SuggestPlayer Data");
    }

    const getOnSubmitHandler = () => {
        switch (currentStep) {
            case 1:
                return onSubmitLocation;
            case 2:
                return onSubmitSkill;
            case 3:
                return onSubmitStylePlay;
            case 4:
                return onSubmitSuggestPlayer;
            default:
                return () => Promise.resolve()
        }
    };

    const handleClick = async (direction: string) => {
        let newStep = currentStep;

        if (direction === "next") {
            if ((user && user.playingArea == null && currentStep === 1) ||
                (user && user.playingLevel == 0 && currentStep === 2) ||
                (user && user.playingWay == null && currentStep === 3)) {
                toast.error("Bạn cần điền đầy đủ trước khi đến bước tiếp theo", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            const onSubmitHandler = getOnSubmitHandler();
            if (onSubmitHandler instanceof Function) {
                await onSubmitHandler();
            }

            newStep++;
        } else if (direction === "back") {
            newStep--;
        }

        newStep = Math.max(1, Math.min(newStep, steps.length));

        setCurrentStep(newStep);

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <form className="p-4 rounded-lg bg-white border-2 border-[#E7EBEE] w-full h-full" onSubmit={handleSubmit(() => getOnSubmitHandler())}>
            <div className="mt-5 ">
                <StepperHorizontal steps={steps} currentStep={currentStep} />

                <div className="my-5 p-4 max-h-full">
                    {currentStep === 1 && <LocationStep />}
                    {currentStep === 2 && <SkillStep />}
                    {currentStep === 3 && <StylePlayStep />}
                    {currentStep === 4 && <SuggestPlayerStep />}
                </div>
            </div>

            {/* navigation button */}
            <StepperControl
                handleClick={handleClick}
                currentStep={currentStep}
                steps={steps}
            />
        </form>
    )
}

export default StepperHorizontalContent
