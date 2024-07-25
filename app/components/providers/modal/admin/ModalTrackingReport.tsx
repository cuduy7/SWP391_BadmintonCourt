"use client"

import { useGoToMessModal, useTrackingReportModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { createGroupChatService } from "@/services"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalTrackingReport = () => {
    const trackingReportModal = useTrackingReportModal()
    const goToMessModal = useGoToMessModal()
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const admin_id = trackingReportModal.adminId
    const report_id = trackingReportModal.reportId

    const handleClick = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (admin_id && report_id) {
            const res = await createGroupChatService({
                admin_id: admin_id,
                report_id: report_id
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                trackingReportModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Tạo nhóm nhắn tin thành công !", {
                position: toast.POSITION.TOP_RIGHT
            })
            trackingReportModal.onClose()
            goToMessModal.onOpen(res.data.roomId)
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={trackingReportModal.isOpen}
            onClose={trackingReportModal.onClose}
            width="md:w-2/4 w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn tạo nhóm nhắn tin để xử lý đơn tố cáo này?</label>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={trackingReportModal.onClose}
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

export default ModalTrackingReport