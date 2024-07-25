"use client"

import { useUserBanUserModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { userBanUserService } from "@/services"
import { toast } from "react-toastify"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { Loading } from "../../loader"

const ModalUserBanUser = ({ id }: { id: string }) => {
    const banUserModal = useUserBanUserModal()
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const handleBan = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id && id) {
            const res = await userBanUserService({ user_id: Number(user.id), user_effect: Number(id) })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Chặn người dùng này thành công!", {
                position: toast.POSITION.TOP_RIGHT
            })
            banUserModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    return (
        <CustomModal
            isOpen={banUserModal.isOpen}
            onClose={banUserModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl truncate">Bạn có muốn chặn người dùng này không?</label>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={banUserModal.onClose}
                    />
                    {isLoadingModal ? (
                        <Button
                            title={<Loading loading={isLoadingModal} color="white" />}
                            isHover={false}
                            style="py-3 px-8"
                        />
                    ) : (
                        <Button
                            title="Có"
                            isHover={false}
                            style="py-3 px-8"
                            onClick={handleBan}
                        />
                    )}
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalUserBanUser