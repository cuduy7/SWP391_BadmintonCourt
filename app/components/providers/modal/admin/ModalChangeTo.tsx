"use client"

import { useChangeMoneyToModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { transactionStatusService, updateStatusReportService, walletService } from "@/services"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalChangeTo = () => {
    const changeToModal = useChangeMoneyToModal()
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const user_id = changeToModal.userId
    const money = changeToModal.money
    const title = changeToModal.title
    const report_id = changeToModal.reportId
    const tran_id = changeToModal.tranId

    const handleClick = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user_id && money) {
            const res = await walletService({
                id: user_id,
                money: Number(money)
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                changeToModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Chuyển tiền thành công !", {
                position: toast.POSITION.TOP_RIGHT
            })

            if (report_id && tran_id) {
                await updateStatusReportService(report_id, 2)
                await transactionStatusService({
                    tran_id: tran_id,
                    status_info: 5
                })
                window.location.reload()
            }

            changeToModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={changeToModal.isOpen}
            onClose={changeToModal.onClose}
            width="md:w-2/4 w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn chuyển tiền qua {title}?</label>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={changeToModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleClick}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalChangeTo