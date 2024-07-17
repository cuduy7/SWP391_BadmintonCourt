"use client"

import { useContext, useEffect, useState } from "react";
import { AiFillMail } from "react-icons/ai";
import { Button, Input, Loading } from "../../providers";
import { GlobalContext } from "@/contexts";
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from "react-toastify";
import { getOtp } from "@/types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { forgotPasswordService } from "@/services/forgotPassword";
import { forgotPasswordSchema } from "@/utils";

const ForgotPasswordForm = () => {
    const [isForgot, setIsForgot] = useState(false)
    const {
        setIsLoading,
        isLoading,
        isAuthUser
    } = useContext(GlobalContext) || {}
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<getOtp>({
        resolver: yupResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: getOtp) => {
        if (setIsLoading) setIsLoading(true)

        const res = await forgotPasswordService(data)

        if (res.data == null) {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        localStorage.setItem("email", JSON.stringify(data.email))

        setIsForgot(true)

        if (setIsLoading) setIsLoading(false)
    }

    useEffect(() => {
        if (isForgot) {
            router.push("/verify-otp")
        } else if (isAuthUser) {
            router.push("/")
        }
    }, [router, isForgot, isAuthUser])

    return (
        <form className="flex flex-col gap-3 pb-2" onSubmit={handleSubmit(onSubmit)}>
            <Input
                icon={<AiFillMail size={25} />}
                label="Email"
                name="email"
                placeholder="Nhập email của bạn"
                type="email"
                colorInput="bg-inherit border-2 border-solid text-white pl-10"
                id="email"
                register={register}
                errors={errors}
            />
            {isLoading ? (
                <Button
                    title={<Loading loading={isLoading} color="white"/>}
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            ) : (
                <Button
                    title="Tiếp tục"
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            )}
        </form>
    )
}

export default ForgotPasswordForm