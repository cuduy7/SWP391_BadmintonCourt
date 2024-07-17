"use client"

import { GlobalContext } from "@/contexts"
import { ChatRoomData } from "@/types"
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import { validateURLAvatar } from "@/utils"

interface ChatGroupProps {
    listRoom: ChatRoomData[]
}

const ChatGroup: React.FC<ChatGroupProps> = ({
    listRoom
}) => {
    const { setRoomId, roomId } = useContext(GlobalContext) || {}
    const roomRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
    const [hasScrolled, setHasScrolled] = useState(false)

    useEffect(() => {
        if (roomId && roomRefs.current[roomId] && !hasScrolled) {
            roomRefs.current[roomId]?.scrollIntoView({ behavior: "smooth" })
            setHasScrolled(true)
        }
    }, [roomId, hasScrolled])

    return (
        <div className="md:col-span-3 col-span-2 overflow-y-auto overflow-x-hidden flex flex-col border-r border-black border-opacity-10 w-24 md:w-auto h-[52rem]">
            {listRoom.map((room) => (
                <div
                    ref={(ref) => (roomRefs.current[room.roomId] = ref)}
                    className={`flex flex-row space-x-2 items-center cursor-pointer px-4 py-1 ${room.roomId === roomId ? 'bg-gray-300' : ''}`}
                    key={room.roomId}
                    onClick={() => {
                        if (setRoomId)
                            setRoomId(room.roomId)
                    }}
                >
                    <div className="flex-shrink-0">
                        <Image
                            src={validateURLAvatar(room.coverImg)}
                            alt={`image roomId ${room.roomId}`}
                            height={100}
                            width={100}
                            className="object-cover md:w-20 md:h-20 h-16 w-16 rounded-full border border-primary-blue-cus"
                        />
                    </div>
                    <div className="flex flex-col gap-1 w-60">
                        <label className="font-semibold text-xl truncate md:block hidden">{room.chatTitle}</label>
                        <p className="text-gray-600 text-lg truncate md:block hidden">{room.lastSendMsg}</p>
                        <p className="text-gray-600 text-sm truncate md:block hidden">{room.lastSendTime}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ChatGroup