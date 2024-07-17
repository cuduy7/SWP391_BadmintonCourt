"use client"

import { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import { Button, Input, Loading, LoadingFullScreen } from '../../providers';
import { GlobalContext } from '@/contexts';
import { putProfileUserService } from '@/services';
import { UserProfileSettingForm } from '@/types';
import { isValidUrl, processBase64Image, settingProfileInputs, settingProfileSchema, validateURLAvatar } from '@/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import Image from 'next/image';

const SettingProfile = () => {
    const maxSize = 1048576

    const {
        user,
        isLoading,
        setIsLoading,
        isLoadingPage,
        setIsLoadingPage,
        setFetchUser
    } = useContext(GlobalContext) || {}

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setError,
        watch
    } = useForm<UserProfileSettingForm>({
        resolver: yupResolver(settingProfileSchema),
        defaultValues: {
            userName: '',
            fullName: '',
            phoneNumber: '',
            playingArea: '',
            sortProfile: '',
            imgURL: ''
        }
    })

    const imgURL = watch('imgURL')

    useEffect(() => {
        if (setIsLoadingPage) setIsLoadingPage(true)

        if (user && user.id) {
            if (user.userName) setValue('userName', user.userName)
            if (user.fullName) setValue('fullName', user.fullName)
            if (user.phoneNumber) setValue('phoneNumber', user.phoneNumber)
            if (user.playingArea) setValue('playingArea', user.playingArea.toString())
            if (user.sortProfile) setValue('sortProfile', user.sortProfile)
            if (user.avatar) setValue('imgURL', user.avatar)
        }

        if (setIsLoadingPage) setIsLoadingPage(false)


    }, [user, setIsLoadingPage, setValue])

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            if (file.size <= maxSize) {
                const fileReader = new FileReader()
                fileReader.onload = (event) => {
                    const base64Image = event.target?.result;
                    //console.log(base64Image)
                    if (typeof base64Image === 'string') {
                        setUploadedImage(base64Image)
                        setValue('imgURL', base64Image)
                    }
                };
                fileReader.readAsDataURL(file);
            } else {
                setError("imgURL", { message: "Chỉ được upload ảnh dưới một 1MB" })
            }
        });
    }, [setValue, setError])

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop,
    });

    const onSubmit = async (data: UserProfileSettingForm) => {
        if (setIsLoading) setIsLoading(true)

        if (user && user.id) {
            const res = await putProfileUserService({
                id: user.id,
                userName: data.userName,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                playingArea: data.playingArea,
                sortProfile: data.sortProfile,
                imgURL: processBase64Image(data.imgURL)
            })

            //console.log(res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            toast.success("Cập nhập hồ sơ thành công", {
                position: toast.POSITION.TOP_RIGHT,
            })

            if (setFetchUser) setFetchUser(true)
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <form className="relative p-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {isLoadingPage ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoadingPage} />
                </div>
            ) : (
                <>
                    <div className="text-gray-600 text-2xl md:text-3xl font-semibold">Hồ sơ</div>
                    <div className="relative flex flex-col w-2/5 gap-3 items-center">
                        <div {...getRootProps()} className="relative w-full pb-[100%] border-2 border-gray-400 p-4 rounded-xl cursor-pointer">
                            <input {...getInputProps()} {...register('imgURL')} />
                            {uploadedImage ? (
                                <Image
                                    src={uploadedImage}
                                    alt="Uploaded avatar"
                                    className="object-cover rounded-xl"
                                    fill
                                />
                            ) : isValidUrl(imgURL) ? (
                                <Image
                                    src={validateURLAvatar(imgURL)}
                                    alt="avatar"
                                    className="object-cover rounded-xl"
                                    fill
                                />
                            ) : (
                                <input {...getInputProps()} {...register('imgURL')} />
                            )}
                        </div>
                        <div className="flex flex-row text-primary-blue-cus items-center gap-2 whitespace-nowrap">
                            <AiFillCamera size={30} />
                            <span className="text-lg md:text-xl font-semibold">Đăng tải hình ảnh</span>
                        </div>
                        {errors.imgURL && <p className="text-red-500 font-medium h-4">{errors.imgURL.message}</p>}
                    </div>
                    <div className="border border-black border-opacity-10" />
                    {settingProfileInputs.map((input) => (
                        <div className="grid grid-cols-7 items-center" key={input.id}>
                            <div className="col-span-2">
                                <label className="text-gray-600 font-semibold text-lg md:text-xl">
                                    {input.label}
                                </label>
                            </div>
                            <div className="col-span-5">
                                <Input
                                    colorInput="bg-[#F5F5F5] border-none md:text-base text-sm"
                                    name={input.name}
                                    type={input.type}
                                    id={input.id}
                                    register={register}
                                    errors={errors}
                                    maxLength={input.maxLength}
                                    flagInput={input.flagInput}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="relative flex justify-center">
                        {isLoading ? (
                            <Button
                                title={<Loading loading={isLoading}/>}
                                type="submit"
                                style="py-3 text-xl px-12"
                                isHover={false}
                            />
                        ) : (
                            <Button
                                title="Lưu"
                                type="submit"
                                style="py-3 text-xl px-12"
                            />
                        )}
                    </div>
                </>
            )}
        </form>
    )
}

export default SettingProfile;
