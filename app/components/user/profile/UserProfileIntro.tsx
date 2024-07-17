"use client"

import Image from "next/image"
import { CheckSub, UserProfileData } from "@/types"
import { Button } from "../../providers"
import { validateDes, validateName, validateURLAvatar } from "@/utils"
import { useReportUserModal, useUnauthorizeModal, useUserBanUserModal } from "@/hooks"
import { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { AxiosClient, subscribeService } from "@/services"
import useSWR from "swr"

const fetcher = (url: string) => AxiosClient.put(url).then(res => res.data)

const UserProfileIntro: React.FC<UserProfileData> = ({
    id,
    imgUrl,
    fullName,
    sortProfile
}) => {
    const { user } = useContext(GlobalContext) || {}
    const reportUserModal = useReportUserModal()
    const banUserModal = useUserBanUserModal()
    const unauthorizeModal = useUnauthorizeModal()

    const { data: checkSub, mutate } = useSWR<CheckSub>(user && id ? `/api/users/${user.id}/check_sub/${id}` : null, fetcher)

    const handleSubscribe = async () => {
        if (user && user.id && id) {
            await subscribeService({ user_id: user.id, target_id: id })
            mutate()
        }
    }

    return (
        <div className="relative flex flex-col gap-5 sm:block">
            <div className="relative flex flex-row gap-8 items-center justify-center sm:justify-normal">
                <div className="relative flex-shrink-0">
                    <Image
                        src={validateURLAvatar(imgUrl)}
                        alt="avatar"
                        width="0"
                        height="0"
                        className="w-36 h-36 sm:w-64 sm:h-64 rounded-full object-cover border border-primary-blue-cus transition-all duration-500"
                        sizes="100vw"
                        placeholder="blur"
                        blurDataURL={validateURLAvatar(imgUrl)}
                    />
                </div>
                <div className="relative flex flex-col sm:flex-grow gap-5">
                    <div className="flex md:flex-row flex-col md:items-center gap-3 transition-all duration-500 md:justify-between flex-wrap">
                        <div className="md:text-4xl text-3xl font-semibold whitespace-nowrap">
                            {validateName(fullName)}
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {!user ? (
                                <button className="text-gray-500 text-lg font-medium underline cursor-pointer" type="button" onClick={unauthorizeModal.onOpen}>
                                    Báo cáo người dùng
                                </button>
                            ) : (
                                <button className={`text-gray-500 text-lg font-medium underline cursor-pointer ${user && user.id && user.id.toString() === id && id.toString() || user && user.role && user.role.toLowerCase() !== "user" ? "hidden" : ""}`} type="button" onClick={reportUserModal.onOpen}>
                                    Báo cáo người dùng
                                </button>
                            )}
                            {!user ? (
                                <button className="text-gray-500 text-lg font-medium underline cursor-pointer" type="button" onClick={unauthorizeModal.onOpen}>
                                    Chặn người dùng
                                </button>
                            ) : (
                                <button className={`text-gray-500 text-lg font-medium underline cursor-pointer ${user && user.id && user.id.toString() === id && id.toString() || user && user.role && user.role.toLowerCase() !== "user" ? "hidden" : ""}`} type="button" onClick={banUserModal.onOpen}>
                                    Chặn người dùng
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={`sm:relative md:items-center sm:gap-5 hidden transition-all duration-500 ${user && user.id && user.id.toString() === id && id.toString() || user && user.role && user.role.toLowerCase() !== "user" ? "hidden" : "sm:flex md:flex-row sm:flex-col"}`}>
                        <div className="relative">
                            {!user ? (
                                <Button
                                    title="Đăng ký"
                                    style="py-3 px-12 text-xl"
                                    onClick={unauthorizeModal.onOpen}
                                />
                            ) : (
                                !checkSub?.data || !checkSub?.data.subed ? (
                                    <Button
                                        title="Đăng ký"
                                        style="py-3 px-12 text-xl"
                                        onClick={handleSubscribe}
                                    />
                                ) : (
                                    <Button
                                        title="Đã đăng ký"
                                        style="py-3 px-12 text-xl"
                                        color="bg-gray-400"
                                        text="text-gray-600"
                                        isHover={false}
                                        onClick={handleSubscribe}
                                    />
                                )
                            )}
                        </div>
                    </div>
                    <div className="sm:relative sm:block sm:space-x-1 hidden">
                        <span className="text-xl font-semibold text-gray-600">
                            Mô tả:
                        </span>
                        <span className="text-lg font-medium text-gray-500">
                            {validateDes(sortProfile)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="relative flex flex-row gap-5 sm:hidden">
                <div className="relative">
                    {!user ? (
                        <Button
                            title="Đăng ký"
                            style="py-3 px-12 text-xl"
                            onClick={unauthorizeModal.onOpen}
                        />
                    ) : (
                        !checkSub?.data || !checkSub?.data.subed ? (
                            <Button
                                title="Đăng ký"
                                style="py-3 px-12 text-xl"
                                onClick={handleSubscribe}
                            />
                        ) : (
                            <Button
                                title="Đã đăng ký"
                                style="py-3 px-12 text-xl"
                                color="bg-gray-400"
                                text="text-gray-600"
                                isHover={false}
                                onClick={handleSubscribe}
                            />
                        )
                    )}
                </div>
            </div>
            <div className="relative space-x-1 sm:hidden">
                <span className="text-xl font-semibold text-gray-600">
                    Mô tả:
                </span>
                <span className="text-lg font-medium text-gray-500">
                    {validateDes(sortProfile)}
                </span>
            </div>
        </div >
    )
}

export default UserProfileIntro