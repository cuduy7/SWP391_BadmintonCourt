"use client"

import { GlobalContext } from "@/contexts"
import { useForm } from "react-hook-form"
import { useRatingModal, useTransactionModal } from "@/hooks"
import Image from "next/image"
import { useContext } from "react"
import { transactionStatusService } from "@/services"
import { toast } from "react-toastify"
import { LoadingActionPayment } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalTransaction = ({ tran_id, creator, userId }: { tran_id: string, creator: string, userId: string }) => {
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}
    const { handleSubmit } = useForm()
    const transactionModal = useTransactionModal()
    const ratingModal = useRatingModal()

    const onSubmit = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id) {
            const res = await transactionStatusService({ tran_id: tran_id, status_info: 3 })

            if (res.data == null) {
                toast.error("Lỗi!", {
                    position: toast.POSITION.TOP_RIGHT
                })
                transactionModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Đặt sân thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            transactionModal.onClose()
            ratingModal.onOpen(creator, user.id, userId, tran_id)
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionPayment loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={transactionModal.isOpen}
            onClose={transactionModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <Image
                    src="/images/pay.png"
                    alt="error"
                    height={200}
                    width={200}
                    className="object-contain w-20 h-16"
                />
                <label className="text-gray-600 font-semibold text-3xl truncate">Xác nhận đã chơi xong?</label>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={transactionModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        type="submit"
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalTransaction