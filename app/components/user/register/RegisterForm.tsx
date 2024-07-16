"use client"

import { Button, Input, Loading } from '../../providers';
import { useForm } from 'react-hook-form';
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/contexts';
import { useRouter } from 'next/navigation';
import { RegisterFormData } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import registerService from '@/services/register';
import { toast } from 'react-toastify';
import { registerInputs, registerSchema } from '@/utils';

const RegisterForm = () => {
    const { setIsLoading, isLoading, isAuthUser } = useContext(GlobalContext) || {}
    const [isRegistered, setIsRegistered] = useState(false);
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        if (setIsLoading) setIsLoading(true)

        const res = await registerService(data)

        if (res.data == null) {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        toast.success("Đăng kí thành công", {
            position: toast.POSITION.TOP_RIGHT,
        })
        setIsRegistered(true)

        if (setIsLoading) setIsLoading(false)
    }

    useEffect(() => {
        if (isRegistered) {
            router.push("/login")
        } else if (isAuthUser) {
            router.push("/")
        }
    }, [router, isRegistered, isAuthUser])

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            {registerInputs.map((item) => (
                <React.Fragment key={item.id}>
                    <Input
                        IconType={item.icon}
                        label={item.label}
                        name={item.name}
                        placeholder={item.placeholder}
                        type={item.type}
                        colorInput="bg-inherit border-2 border-solid text-white pl-10"
                        id={item.id}
                        register={register}
                        errors={errors}
                        maxLength={item.maxLength}
                    />
                </React.Fragment>
            ))}
            {isLoading ? (
                <Button
                    title={<Loading loading={isLoading} color="white" />}
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            ) : (
                <Button
                    title="Đăng ký"
                    type="submit"
                    style="py-3 w-full font-semibold text-lg rounded-xl py-3 justify-center"
                    isHover={false}
                />
            )}
        </form>
    );
};

export default RegisterForm;
