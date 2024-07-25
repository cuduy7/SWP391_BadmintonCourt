"use client"

import { useUnauthorizeModal } from "@/hooks"
import CustomModal from "./Modal"
import { Button } from "../form"
import { useRouter } from "next/navigation"

const ModalUnauthorize = () => {
    const unauthorizeModal = useUnauthorizeModal()
    const router = useRouter()

    const handleGoToLogin = () => {
        router.push("/login")
        unauthorizeModal.onClose()
    }

    return (
        <CustomModal
            isOpen={unauthorizeModal.isOpen}
            onClose={unauthorizeModal.onClose}
            width="w-auto"
            height="h-auto"
        >
            <div className="flex flex-col px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-black font-semibold text-3xl truncate">Bạn cần đăng nhập để tiếp tục</label>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Ở lại"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={unauthorizeModal.onClose}
                    />
                    <Button
                        title="Đi tới trang đăng nhập"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleGoToLogin}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default ModalUnauthorize