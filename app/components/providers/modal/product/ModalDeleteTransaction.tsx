"use client"

import { useDeleteTransactionModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { deleteTransactionService } from "@/services"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { useRouter } from "next/router"

const ModalDeleteTransaction = () => {
    const deleteTransactionModal = useDeleteTransactionModal()
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}
    const tran_id = deleteTransactionModal.tranId
    const router = useRouter()

    const handleDeletePost = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (tran_id) {
            const res = await deleteTransactionService(tran_id)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                deleteTransactionModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Xóa giao dịch thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            deleteTransactionModal.onClose()
            router.push("/")
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={deleteTransactionModal.isOpen}
            onClose={deleteTransactionModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn xóa giao dịch này không?</label>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={deleteTransactionModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleDeletePost}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalDeleteTransaction