"use client"

import React, { FC, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AdminSettingData, ListDistrictData, ListProductData, NotifyData } from '@/types'
import { useRouter } from 'next/router'
import { getAllDistrictService, getSettingService, getUserService } from '@/services'

interface GlobalStateProps {
    children: React.ReactNode
}

interface User {
    id?: string
    fullName?: string | null
    email?: string | null
    avatar?: string | null
    playingArea?: string[] | null
    playingLevel?: number | null
    playingWay?: string[] | null
    token?: string | null
    isNewUser?: boolean | null
    phoneNumber?: string | null
    sortProfile?: string | null
    userName?: string | null
    userAddress?: string | null
    balance?: number | null
    displayName?: string | null
    role?: "User" | "Staff" | "Admin"
    isPolicy?: boolean | null
}

export enum SettingNames {
    PostingFee = "postingFee",
    BookingFee = "bookingFee",
    FreeNumberPost = "freeNumberPost",
    BoostPostFree = "boostPostFree",
    CancelHour = "cancelHour",
}

interface GlobalContextProps {
    isAuthUser: boolean | null
    setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    isLoading: boolean | null
    setIsLoading: React.Dispatch<React.SetStateAction<boolean | null>>
    isLoadingNotify: boolean | null
    setIsLoadingNotify: React.Dispatch<React.SetStateAction<boolean | null>>
    isLoadingModal: boolean | null
    setIsLoadingModal: React.Dispatch<React.SetStateAction<boolean | null>>
    isLoadingPage: boolean | null
    setIsLoadingPage: React.Dispatch<React.SetStateAction<boolean | null>>
    showMenu: boolean | null
    setShowMenu: React.Dispatch<React.SetStateAction<boolean | null>>
    isRefresh: boolean | null
    setIsRefresh: React.Dispatch<React.SetStateAction<boolean | null>>
    fetchUser: boolean | null
    setFetchUser: React.Dispatch<React.SetStateAction<boolean | null>>
    searchValue: string | null
    setSearchValue: React.Dispatch<React.SetStateAction<string | null>>
    searchResults: ListProductData[] | null
    setSearchResults: React.Dispatch<React.SetStateAction<ListProductData[] | null>>
    roomId: string | null
    setRoomId: React.Dispatch<React.SetStateAction<string | null>>
    saveDistrict: ListDistrictData | null
    setSaveDistrict: React.Dispatch<React.SetStateAction<ListDistrictData | null>>
    listDistrict: ListDistrictData[] | null
    setListDistrict: React.Dispatch<React.SetStateAction<ListDistrictData[] | null>>
    listNotify: NotifyData[] | null
    setListNotify: React.Dispatch<React.SetStateAction<NotifyData[] | null>>
    listSetting: AdminSettingData[] | null
    setListSetting: React.Dispatch<React.SetStateAction<AdminSettingData[] | null>>
    AIListProduct: ListProductData[] | null
    setAIListProduct: React.Dispatch<React.SetStateAction<ListProductData[] | null>>
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);

const GlobalState: FC<GlobalStateProps> = ({ children }) => {
    const router = useRouter()
    const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean | null>(false)
    const [isLoadingNotify, setIsLoadingNotify] = useState<boolean | null>(false)
    const [isLoadingModal, setIsLoadingModal] = useState<boolean | null>(false)
    const [isLoadingPage, setIsLoadingPage] = useState<boolean | null>(false)
    const [showMenu, setShowMenu] = useState<boolean | null>(false)
    const [isRefresh, setIsRefresh] = useState<boolean | null>(false)
    const [fetchUser, setFetchUser] = useState<boolean | null>(false)
    const [searchValue, setSearchValue] = useState<string | null>("")
    const [saveDistrict, setSaveDistrict] = useState<ListDistrictData | null>(null)
    const [searchResults, setSearchResults] = useState<ListProductData[] | null>([])
    const [listDistrict, setListDistrict] = useState<ListDistrictData[] | null>([])
    const [listNotify, setListNotify] = useState<NotifyData[] | null>([])
    const [listSetting, setListSetting] = useState<AdminSettingData[] | null>([])
    const [roomId, setRoomId] = useState<string | null>(null)
    const [AIListProduct, setAIListProduct] = useState<ListProductData[] | null>(null)

    useEffect(() => {
        const fetchDistricts = async () => {
            const res = await getAllDistrictService()
            setListDistrict(res.data);
        }

        fetchDistricts()
    }, [])

    useEffect(() => {
        const fetchListSetting = async () => {
            const res = await getSettingService()
            setListSetting(res.data)
        }

        fetchListSetting()
    }, [])

    useEffect(() => {
        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true)
            const userData = JSON.parse(localStorage.getItem('user')!) || {}
            setUser(userData)
        } else {
            setIsAuthUser(false)
            setUser(null)
        }
    }, [])

    useEffect(() => {
        const fetch = async () => {
            if (user && user.id) {
                const res = await getUserService({ user_id: user.id })
                localStorage.setItem('user', JSON.stringify(res.data))
                setUser(res.data)
            }
        }

        if (fetchUser) {
            fetch()
            setFetchUser(false)
        }

        const intervalId = setInterval(fetch, 5 * 60 * 1000)

        return () => clearInterval(intervalId)
    }, [fetchUser, user])

    useEffect(() => {
        const handleRouteChange = () => {
            if (router.pathname === '/product/list-product') {
                setSaveDistrict(null)
            }
        }

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.pathname, router.events])

    useEffect(() => {
        if (isRefresh) {
            router.reload()
            setIsRefresh(false)
        }
    }, [isRefresh, router])

    return (
        <GlobalContext.Provider
            value={{
                isAuthUser,
                setIsAuthUser,
                user,
                setUser,
                isLoading,
                setIsLoading,
                isLoadingPage,
                setIsLoadingPage,
                setShowMenu,
                showMenu,
                searchResults,
                searchValue,
                setSearchResults,
                setSearchValue,
                isLoadingModal,
                setIsLoadingModal,
                isRefresh,
                setIsRefresh,
                roomId,
                setRoomId,
                fetchUser,
                setFetchUser,
                saveDistrict,
                setSaveDistrict,
                listDistrict,
                setListDistrict,
                listNotify,
                setListNotify,
                isLoadingNotify,
                setIsLoadingNotify,
                listSetting,
                setListSetting,
                AIListProduct,
                setAIListProduct
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;