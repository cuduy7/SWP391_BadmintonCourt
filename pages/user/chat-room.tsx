"use client"

import { ChatGroup, ChatMessages, Container, LoadingFullScreen, Navbar } from "@/app/components"
import { GlobalContext } from "@/contexts"
import { AxiosClient } from "@/services"
import { ChatRoom } from "@/types"
import Image from 'next/image'
import { useContext } from "react"
import useSWR from "swr"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const ChatRoomPage = () => {
    const { user } = useContext(GlobalContext) || {}
    const { data: listRoom, error } = useSWR<ChatRoom>(user && user.id ? `/api/chat/user/${user.id}/rooms` : null, fetcher, { refreshInterval: 3000 })

    const isLoading = !listRoom && !error

    return (
        <div className="overflow-hidden">
            <Navbar />
            <Container>
                {isLoading ? (
                    <div className="h-screen flex items-center justify-center">
                        <LoadingFullScreen loading={isLoading} />
                    </div>
                ) : !listRoom || listRoom && listRoom.data == null ? (
                    <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                        <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                            <h1 className="md:text-4xl text-3xl transition-all duration-500">Bạn chưa tham gia nhóm chat nào cả!</h1>
                            <div className="relative">
                                <Image
                                    src="/images/sad.gif"
                                    alt="Gif"
                                    width={100}
                                    height={100}
                                    className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                                />
                            </div>
                        </div>
                        <p className="md:text-3xl text-xl text-center transition-all duration-500">Vui lòng thực hiện giao dịch tham gia nhóm chat</p>
                    </div>
                ) : (
                    <div className="relative md:pt-5">
                        <div className="grid grid-cols-12 border border-black border-opacity-10 rounded-lg">
                            <ChatGroup listRoom={listRoom.data} />
                            <ChatMessages />
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default ChatRoomPage