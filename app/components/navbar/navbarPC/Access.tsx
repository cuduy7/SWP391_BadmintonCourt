"use client"

import { useContext, useRef, useState } from "react"
import { VscAccount } from "react-icons/vsc"
import { IoIosNotifications, IoIosNotificationsOutline } from "react-icons/io"
import { IoSettingsOutline } from "react-icons/io5"
import { GlobalContext } from "@/contexts"
import { useRouter } from 'next/router'
import Cookies from "js-cookie"
import { beforeNavUser, useOutsideClick, validateURLAvatar } from "@/utils"
import SearchBar from "../SearchBar"
import Image from "next/image"
import { putNotifyService } from "@/services"
import { Loading } from "../../providers"
import { useUnauthorizeModal } from "@/hooks"
import { mutate } from "swr"

const Access = () => {
    const [showToggle, setShowToggle] = useState(false)
    const [showNotify, setShowNotify] = useState(false)
    const router = useRouter()
    const {
        isAuthUser,
        setIsAuthUser,
        setUser,
        user,
        setIsRefresh,
        listNotify,
        isLoadingNotify,
    } = useContext(GlobalContext) || {}
    const unauthorizeModal = useUnauthorizeModal()

    const handleToggle = () => {
        setShowToggle(!showToggle)
    }

    const handleOutsideClick = () => {
        setShowToggle(false)
    }

    const handleToggleNotify = () => {
        if (setShowNotify) setShowNotify(!showNotify)
        if (filterRead && filterRead.length !== 0) {
            const arrayNotify = filterRead.map(item => item.id)
            putNotifyService({ notiIds: arrayNotify })
            if (user) mutate(`/api/users/${user.id}/notification`)
        }
    }

    const handleOutsideClickNotify = () => {
        if (setShowNotify) setShowNotify(false)
    }

    const handleLogout = async () => {
        if (setIsAuthUser && setUser) {
            setIsAuthUser(false)
            setUser(null)
        }
        Cookies.remove("token")
        localStorage.clear()
        router.push("/").then(() => {
            if (setIsRefresh) {
                setIsRefresh(true)
            }
        })
    }

    const filterRead = listNotify && listNotify.filter((item) => item.isRead !== true)

    const handleRouterNotify = (value: string, id: string) => {
        if (value.toLowerCase() === "post") {
            return router.push(`/product/detail-product/${id}`)
        }

        if (value.toLowerCase()  === "user") {
            return router.push(`/user/profile-user/${id}`)
        }

        if (value.toLowerCase()  === "tran") {
            return router.push(`/transaction/detail-transaction/${id}`)
        }
    }

    const ref = useRef<HTMLLIElement | null>(null)
    useOutsideClick(ref, handleOutsideClick)

    const refNotify = useRef<HTMLLIElement | null>(null)
    useOutsideClick(refNotify, handleOutsideClickNotify)

    return (
        <ul className="
                flex 
                items-center 
                list-none
            "
        >
            <li className="relative inline-flex">
                <div className="
                        box-border 
                        lg:pl-4 
                        lg:pr-1
                    "
                >
                    <div className="
                            relative 
                            inline-flex 
                            py-4 
                        "
                    >
                        <SearchBar />
                    </div>
                </div>
            </li>
            <li className="relative inline-flex" ref={ref}>
                <div
                    className="
                        border-box 
                        pl-4 
                        pr-1 
                        md:pl-5
                    "
                    onClick={handleToggle}
                >
                    <div className="
                            bg-transparent 
                            border-none 
                            cursor-pointer
                        "
                    >
                        <div className="
                                items-center 
                                box-border 
                                flex
                            "
                        >
                            <div className="
                                    self-center
                                    items-center
                                    inline-flex
                                    cursor-pointer
                                    align-middle
                                "
                            >
                                {isAuthUser ? (
                                    <Image
                                        src={validateURLAvatar(user && user.avatar)}
                                        alt="avatar"
                                        width={200}
                                        height={200}
                                        className="object-cover rounded-full w-10 h-10 border border-pri"
                                    />
                                ) : (
                                    <VscAccount size={30} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showToggle && (
                    <div className="
                            absolute 
                            top-12 
                            -left-16 
                            bg-white 
                            rounded-lg 
                            shadow-md 
                            py-2
                            font-bold
                            text-gray-600
                            z-[99999]
                        "
                    >
                        {isAuthUser ? (
                            <ul className="space-y-2 list-none">
                                {user && user.role && user.role.toLowerCase() !== "user" ? (
                                    <></>
                                ) : (
                                    <li className="hover:bg-slate-200 hover:text-primary-blue-cus">
                                        <button className="
                                                block 
                                                cursor-pointer 
                                                px-4 
                                                py-2
                                                whitespace-nowrap
                                            "
                                            type="button"
                                            onClick={() => router.push(`/user/profile-user/${user?.id ?? "1"}`)}
                                        >
                                            Hồ sơ
                                        </button>
                                    </li>
                                )}
                                <li className="hover:bg-slate-200 hover:text-primary-blue-cus">
                                    <button className="
                                            block 
                                            cursor-pointer 
                                            px-4 
                                            py-2
                                            whitespace-nowrap
                                        "
                                        type="button"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="space-y-2 list-none">
                                {beforeNavUser.map((item, index) => (
                                    <li className="hover:bg-slate-200 hover:text-primary-blue-cus" key={index}>
                                        <button className="
                                            block 
                                            cursor-pointer 
                                            px-4 
                                            py-2
                                            whitespace-nowrap
                                        "
                                            type="button"
                                            onClick={() => router.push(item.href)}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </li>
            <li className="relative inline-flex" ref={refNotify}>
                <div
                    className="
                        border-box 
                        pl-4 
                        pr-1 
                        md:pl-5
                    "
                >
                    <div className="
                            bg-transparent 
                            border-none 
                            cursor-pointer
                        "
                    >
                        <div className="
                                items-center 
                                box-border 
                                flex
                            "
                        >
                            {isAuthUser ? (
                                <button className="
                                        self-center
                                        items-center
                                        inline-flex
                                        cursor-pointer
                                        align-middle
                                    "
                                    onClick={handleToggleNotify}
                                >
                                    {showNotify ? (
                                        <IoIosNotifications size={36} color="#204D94" />
                                    ) : (
                                        <IoIosNotificationsOutline size={36} />
                                    )}
                                </button>
                            ) : (
                                <button className="
                                        self-center
                                        items-center
                                        inline-flex
                                        cursor-pointer
                                        align-middle
                                    "
                                    onClick={unauthorizeModal.onOpen}
                                >
                                    <IoIosNotificationsOutline size={36} />
                                </button>
                            )}
                            {filterRead && filterRead.length === 0 ? (
                                <></>
                            ) : (
                                <div className="absolute text-sm font-semibold text-white right-0 -bottom-2 top-auto left-auto bg-primary-blue-cus rounded-full w-5 h-5 flex items-center justify-center">
                                    {filterRead && filterRead.length}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {showNotify && (
                    <div className="
                            absolute 
                            top-12
                            -left-6 
                            bg-white 
                            rounded-lg 
                            shadow-md 
                            py-2
                            font-bold
                            text-gray-600
                            z-[99999]
                            min-h-[50px]
                            max-h-[500px]
                            overflow-auto
                            flex 
                            justify-center 
                            items-center
                        "
                    >
                        {isLoadingNotify ? (
                            <div className="w-[240px] relative flex items-center justify-center">
                                <Loading loading={isLoadingNotify} />
                            </div>
                        ) : !listNotify || listNotify.length === 0 ? (
                            <></>
                        ) : (
                            <ul className="space-y-2 list-none w-[240px] max-h-[440px]">
                                {listNotify.map((item) => (
                                    <li className="hover:bg-slate-200 hover:text-primary-blue-cus text-gray-600 relative" key={item.id}>
                                        <button className="
                                                px-4 
                                                py-2
                                                flex 
                                                flex-col
                                                text-left
                                                justify-around
                                                relative
                                            "
                                            type="button"
                                            onClick={async () => await handleRouterNotify(item.about, item.referenceId)}
                                        >
                                            <div className="text-base font-medium truncate">
                                                {item.title}
                                            </div>
                                            <div className="text-sm font-normal line-clamp-2 break-words w-[208px]">
                                                {item.content}
                                            </div>
                                            <div className="flex justify-between w-full flex-wrap">
                                                {item.isRead ? (
                                                    <div className="text-sm font-medium text-primary-blue-cus">
                                                        Đã xem
                                                    </div>
                                                ) : (
                                                    <div className="text-sm font-medium">
                                                        Chưa xem
                                                    </div>
                                                )}
                                                <div className="text-sm font-medium">
                                                    {item.notiDate}
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </li>
            <li className="relative inline-flex">
                <div
                    className="
                        border-box 
                        pl-4 
                        pr-0 
                        md:pl-5 
                        md:pr-5
                    "
                >
                    <div className="
                            bg-transparent 
                            border-none 
                            cursor-pointer
                        "
                    >
                        <div className="
                                items-center 
                                box-border 
                                flex
                            "
                        >
                            <button className="
                                    self-center
                                    items-center
                                    inline-flex
                                    cursor-pointer
                                    align-middle
                                "
                                type="button"
                                onClick={() => router.push("/user/setting-profile")}
                            >
                                <IoSettingsOutline size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default Access