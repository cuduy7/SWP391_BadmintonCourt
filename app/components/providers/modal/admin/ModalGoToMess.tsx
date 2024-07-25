"use client"

import { useGoToMessModal } from "@/hooks"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { useRouter } from "next/router"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"

const ModalGoToMess = () => {
    const goToMessModal = useGoToMessModal()
    const router = useRouter()
    const { setRoomId } = useContext(GlobalContext) || {}

    const room_id = goToMessModal.roomId

    return (
        <CustomModal
            isOpen={goToMessModal.isOpen}
            onClose={goToMessModal.onClose}
            width="md:w-2/4 w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Đi tới ngay!</label>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={goToMessModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={() => {
                            if (setRoomId) setRoomId(room_id)
                            router.push("/user/chat-room")
                            goToMessModal.onClose()
                        }}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalGoToMess