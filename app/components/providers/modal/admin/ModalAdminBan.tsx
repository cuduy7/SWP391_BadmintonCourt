"use client"

import { useAdminBanModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { adminBanUserService, updateStatusReportService } from "@/services"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalAdminBan = ({ user_id }: { user_id: string }) => {
    const adminBanModal = useAdminBanModal()
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}
    const report_id = adminBanModal.reportId

    const handleBanUser = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id) {
            const res = await adminBanUserService({
                admin_id: user.id,
                user_id: user_id
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                adminBanModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Khóa tài khoản thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            mutate(`/api/users/admin/${user.id}/user/${user_id}/detail`)

            if (report_id) {
                await updateStatusReportService(report_id, 2)
                window.location.reload()
            }

            adminBanModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={adminBanModal.isOpen}
            onClose={adminBanModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn khóa tài khoản này không?</label>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={adminBanModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleBanUser}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalAdminBan