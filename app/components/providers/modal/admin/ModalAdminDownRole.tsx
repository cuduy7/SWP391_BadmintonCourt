"use client"

import { useAdminDownRoleModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { adminDownRoleService } from "@/services"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalAdminDownRole = ({ user_id }: { user_id: string }) => {
    const adminDownRoleModal = useAdminDownRoleModal()
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const handleBanUser = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id) {
            const res = await adminDownRoleService({
                admin_id: user.id,
                user_id: user_id
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                adminDownRoleModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Cấp quyền thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            mutate(`/api/users/admin/${user.id}/user/${user_id}/detail`)
            adminDownRoleModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={adminDownRoleModal.isOpen}
            onClose={adminDownRoleModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn tước quyền của tài khoản này không?</label>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={adminDownRoleModal.onClose}
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

export default ModalAdminDownRole