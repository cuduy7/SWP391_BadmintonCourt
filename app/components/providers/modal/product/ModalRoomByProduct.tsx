"use client"

import { useRoomByProductModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { useRouter } from "next/router"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalRoomByProduct = () => {
    const roomByRoleModal = useRoomByProductModal()
    const { setRoomId } = useContext(GlobalContext) || {}

    const router = useRouter()

    return (
        <CustomModal
            isOpen={roomByRoleModal.isOpen}
            onClose={roomByRoleModal.onClose}
            width="lg:w-auto md:w-3/4 w-full"
            height="h-auto"
        >
            <form className="flex flex-col lg:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Nhắn tin</label>
                <div className={`gap-5 pt-5 ${roomByRoleModal.listRoom && roomByRoleModal.listRoom.length % 2 === 0 ? "grid grid-cols-2" : "grid grid-cols-3"}`}>
                    {roomByRoleModal.listRoom && roomByRoleModal.listRoom.map((item) => (
                        <div className="col-span-1 relative w-full" key={item.id}>
                            <Button
                                title={item.playDate}
                                style="py-3 px-8"
                                onClick={() => {
                                    if (setRoomId) setRoomId(item.id)
                                    router.push("/user/chat-room")
                                    roomByRoleModal.onClose()
                                }}
                            />
                        </div>
                    ))}
                </div>
            </form >
        </CustomModal >
    )
}

export default ModalRoomByProduct