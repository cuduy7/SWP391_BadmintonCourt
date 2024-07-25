"use client"

import { useContext, useEffect, useState } from "react"
import { Button, CountdownTimer, InputOTP, Loading } from "../../providers"
import { GlobalContext } from "@/contexts"
import { useForm } from "react-hook-form"
import { verifyOTPService } from "@/services/forgotPassword"
import { toast } from "react-toastify"
import { OTP } from "@/types"
import { useRouter } from "next/navigation"

const VerifyOTPForm = () => {
    const [isOTP, setIsOTP] = useState("")
    const [isVerify, setIsVerify] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const { setIsLoading, isLoading, user } = useContext(GlobalContext) || {}
    const { handleSubmit, formState: { errors } } = useForm<OTP>()

    const router = useRouter()

    const handleOTPChange = (otpValue: string) => {
        setIsOTP(otpValue)
    };

    const onSubmit = async () => {
        if (setIsLoading) setIsLoading(true)

        const email = JSON.parse(localStorage.getItem("email")!)

        if (user && user.isNewUser) {
            const userEmail = JSON.parse(localStorage.getItem("userEmail")!)
            //console.log(userEmail);

            const res = await verifyOTPService({ email: userEmail, otp: isOTP })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            toast.success("Xác thực thành công", {
                position: toast.POSITION.TOP_RIGHT,
            })

            localStorage.removeItem("userEmail")
            setIsRegister(true)
        } else if (email) {
            const res = await verifyOTPService({ email: email, otp: isOTP })
            //console.log("Verify_otp: ", res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            toast.success("Xác thực thành công", {
                position: toast.POSITION.TOP_RIGHT,
            })

            setIsVerify(true)
        }

        if (setIsLoading) setIsLoading(false)
    }

    useEffect(() => {
        if (isRegister) {
            router.push("/")
        } else if (isVerify) {
            router.push("/change-password")
        }
    }, [router, isVerify, isRegister])

    return (
        <form className="flex flex-col gap-3 pb-2" onSubmit={handleSubmit(onSubmit)}>
            <InputOTP
                length={6}
                onOTPChange={handleOTPChange}
                errors={errors.digit}
            />
            <CountdownTimer initialMinutes={5} />
            {isLoading ? (
                <Button
                    title={<Loading loading={isLoading} color="white" />}
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            ) : (
                <Button
                    title="Xác nhận"
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            )}
        </form>
    )
}

export default VerifyOTPForm