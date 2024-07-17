"use client"

import Link from 'next/link'
import { Button, Input, Loading } from '../../providers'
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify'
import { LoginFormData } from '@/types'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '@/contexts'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { yupResolver } from "@hookform/resolvers/yup"
import loginService from '@/services/login'
import { loginInputs, loginSchema } from '@/utils'
import { forgotPasswordService } from '@/services'

const LoginForm = () => {
    const {
        isAuthUser,
        setIsAuthUser,
        setUser,
        user,
        setIsLoading,
        isLoading,
        setIsRefresh
    } = useContext(GlobalContext) || {}
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: yupResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        if (setIsLoading) setIsLoading(true)

        const res = await loginService(data)

        //console.log("Data", res)

        if (res.data == null) {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        toast.success("Đăng nhập thành công", {
            position: toast.POSITION.TOP_RIGHT,
        })

        if (setIsAuthUser && setUser) {
            setIsAuthUser(true)
            const user = res.data
            setUser(user)
        }

        if (res.data.isNewUser) {
            await forgotPasswordService({ email: data.email })
            localStorage.setItem("userEmail", JSON.stringify(data.email))
        }

        Cookies.set("token", res.data.token)
        localStorage.setItem("user", JSON.stringify(res.data))


        if (setIsLoading) setIsLoading(false)
        if (setIsRefresh) setIsRefresh(true)
    }

    useEffect(() => {
        if (user && user.role && user.role.toLowerCase() === "admin") {
            router.push("/admin/admin-home")
        } else if (user && user.role && user.role.toLowerCase() === "staff") {
            router.push("/")
        } else if (user && user.isNewUser) {
            router.push("/verify-otp")
        } else if (user && user.role && user.role.toLowerCase() === "user") {
            router.push("/")
        }
    }, [router, user])

    return (
        <form className="flex flex-col gap-3 pb-2" onSubmit={handleSubmit(onSubmit)}>
            {loginInputs.map((input) => (
                <React.Fragment key={input.id}>
                    <Input
                        IconType={input.icon}
                        label={input.label}
                        name={input.name}
                        placeholder={input.placeholder}
                        type={input.type}
                        colorInput="bg-inherit border-2 border-solid text-white pl-10"
                        id={input.id}
                        register={register}
                        errors={errors}
                    />
                </React.Fragment>
            ))}
            <div className="
                    font-semibold 
                    cursor-pointer 
                    text-right
                    text-white
                "
            >
                <Link href="./forgot-password" className=" ">
                    Quên mật khẩu ?
                </Link>
            </div>
            {isLoading ? (
                <Button
                    title={<Loading loading={isLoading} color="white" />}
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            ) : (
                <Button
                    title="Đăng nhập"
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            )}
        </form>
    );
};

export default LoginForm
