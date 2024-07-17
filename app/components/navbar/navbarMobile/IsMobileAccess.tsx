"use client"

import Link from 'next/link';
import { useContext, useRef, useState } from 'react'
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';
import { BiMenu } from 'react-icons/bi'
import { GlobalContext } from '@/contexts';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { beforeNavUser, useOutsideClick, validateURLAvatar } from '@/utils';
import { LiaWindowClose } from 'react-icons/lia';
import Image from 'next/image';
import { useUnauthorizeModal } from '@/hooks';
import { putNotifyService } from '@/services';
import { mutate } from 'swr';
import { Loading } from '../../providers';

interface IsMobileAccessPros {
    onclick: () => void;
}

const IsMobileAccess: React.FC<IsMobileAccessPros> = ({
    onclick
}) => {
    const [showToggle, setShowToggle] = useState(false);
    const [showNotify, setShowNotify] = useState(false)
    const router = useRouter()
    const {
        isAuthUser,
        setIsAuthUser,
        setUser,
        user,
        setIsRefresh,
        listNotify,
        showMenu,
        isLoadingNotify
    } = useContext(GlobalContext) || {}
    const unauthorizeModal = useUnauthorizeModal()

    const handleToggle = () => {
        setShowToggle(!showToggle);
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
        setShowNotify(false)
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

        if (value.toLowerCase()  === "User") {
            return router.push(`/user/profile-user/${id}`)
        }

        if (value.toLowerCase()  === "Tran") {
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
                                        width={150}
                                        height={150}
                                        className="object-cover rounded-full w-8 h-8 border border-pri"
                                    />
                                ) : (
                                    <VscAccount size={24} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {showToggle && (
                    <div className="
                            absolute 
                            top-8 
                            left-5 
                            bg-white 
                            rounded-lg 
                            shadow-md 
                            py-2
                            z-[1999]
                            text-gray-600
                            font-bold
                        "
                    >
                        {isAuthUser ? (
                            <ul className="space-y-2 list-none whitespace-nowrap">
                                {user && user.role && user.role.toLowerCase() !== "user" ? (
                                    <></>
                                ) : (
                                    <li className="hover:bg-slate-200 hover:text-primary-blue-cus">
                                        <button className="
                                                block 
                                                cursor-pointer 
                                                px-4 
                                                py-2
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
                                   "
                                        type="button"
                                        onClick={handleLogout}
                                    >
                                        Đăng xuất
                                    </button>
                                </li>
                            </ul>
                        ) : (
                            <ul className="space-y-2 list-none whitespace-nowrap">
                                {beforeNavUser.map((item, index) => (
                                    <li className="hover:bg-slate-200 hover:text-primary-blue-cus" key={index}>
                                        <button className="
                                            block 
                                            cursor-pointer 
                                            px-4 
                                            py-2
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
                            <div className="
                                    self-center
                                    items-center
                                    inline-flex
                                    cursor-pointer
                                    align-middle
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
                                            <IoIosNotifications size={30} color="#204D94" />
                                        ) : (
                                            <IoIosNotificationsOutline size={30} />
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
                                        <IoIosNotificationsOutline size={30} />
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
                </div>
                {showNotify && (
                    <div className="
                            absolute 
                            top-10
                            sm:-left-20
                            -left-24
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
                                    <li className="hover:bg-slate-200 hover:text-primary-blue-cus text-gray-600" key={item.id}>
                                        <button className="
                                                px-4 
                                                py-2
                                                flex 
                                                flex-col
                                                text-left
                                                justify-around
                                            "
                                            onClick={() => handleRouterNotify(item.about, item.referenceId)}
                                        >
                                            <div className="text-base font-medium truncate">
                                                {item.title}
                                            </div>
                                            <div className="text-sm font-normal line-clamp-2 break-words w-[208px]">
                                                {item.content}
                                            </div>
                                            <div className="flex justify-between w-full">
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
                            <div className="
                                    self-center
                                    items-center
                                    inline-flex
                                    cursor-pointer
                                    align-middle
                                "
                            >
                                <Link href="/user/setting-profile">
                                    <IoSettingsOutline size={24} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li className="relative inline-flex">
                <button
                    type="button"
                    className="
                        box-border 
                        transition 
                        duration-300 
                        pl-4 
                        pr-0 
                        md:pl-5
                         
                    "
                    data-tag="dropdown-menu"
                    aria-controls="dropdown-menu"
                    onClick={onclick}
                >
                    <div className="
                            relative 
                            inline-flex  
                            py-1
                        "
                    >
                        <div className="
                                inline-flex 
                                items-center 
                                justify-center
                                cursor-pointer
                            "
                        >
                            {showMenu ? (
                                <LiaWindowClose size={30} />
                            ) : (

                                <BiMenu size={30} />
                            )}
                        </div>
                    </div>
                </button>
            </li>
        </ul>
    )
}

export default IsMobileAccess