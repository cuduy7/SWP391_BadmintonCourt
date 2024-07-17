"use client"

import { useReportTransactionModal } from "@/hooks"
import { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { reportTransactionService, transactionStatusService } from "@/services"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { Loading } from "../../loader"
import { mutate } from "swr"

const ModalReportTransaction = () => {
    const reportTransactionModal = useReportTransactionModal()
    const [selectedReport, setSelectedReport] = useState({
        label: "",
        value: ""
    })
    const { setIsLoadingModal, isLoadingModal, user } = useContext(GlobalContext) || {}
    const { handleSubmit } = useForm()

    const listReport = [
        { label: "LỪA ĐẢO", value: "Có dấu hiệu lừa đảo" },
        { label: "BUÔN BÁN", value: "Bài đăng đã bị trùng với bài đăng khác" },
        { label: "GIAO TIẾP", value: "Người tham gia bài đăng có lời nói thô tục, khiếm nhã đối với những người dùng khác (cung cấp tên người dùng)" },
    ]

    const onSubmit = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (selectedReport.label.trim() === "" || selectedReport.value.trim() === "") {
            toast.error("Chọn tố cáo trước khi tố cáo", {
                position: toast.POSITION.TOP_RIGHT
            })
            if (setIsLoadingModal) setIsLoadingModal(false)
            return
        }

        if (reportTransactionModal.tran_id) {
            const res = await reportTransactionService({
                tran_id: reportTransactionModal.tran_id,
                reportContent: selectedReport.value,
                reportTitle: selectedReport.label
            })

            //console.log(res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            await transactionStatusService({
                tran_id: reportTransactionModal.tran_id,
                status_info: 4
            })

            if (user) mutate(`/api/posts/user/${user.id}/joined`)

            toast.success("Tố cáo thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            reportTransactionModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    return (
        <CustomModal
            isOpen={reportTransactionModal.isOpen}
            onClose={reportTransactionModal.onClose}
            title="Báo cáo hóa đơn"
            width="md:w-96 w-full"
            height="h-auto"
        >
            <form className="flex flex-col gap-3 justify-center p-2" onSubmit={handleSubmit(onSubmit)}>
                {listReport.map((report, index) => (
                    <div key={index} className="text-lg text-gray-600 font-medium space-x-2">
                        <input
                            type="radio"
                            id={`report-${index}`}
                            name="report"
                            value={report.label}
                            checked={selectedReport.label === report.label}
                            onChange={() => setSelectedReport(report)}
                            className="hidden"
                        />
                        <label htmlFor={`report-${index}`} className="flex items-center cursor-pointer">
                            <span className={`w-5 h-5 inline-block mr-2 rounded-full border border-gray-300 relative bg-white`}>
                                {selectedReport.label === report.label && <span className="absolute inset-0 m-auto h-3 w-3 bg-primary-blue-cus rounded-full"></span>}
                            </span>
                            {report.label}
                        </label>
                    </div>
                ))}
                <div className="relative flex justify-center pt-2">
                    {isLoadingModal ? (
                        <Button
                            title={<Loading loading={isLoadingModal} color="white" />}
                            style="px-6 text-lg"
                            type="submit"
                            isHover={false}
                        />
                    ) : (
                        <Button
                            title="Xác nhận"
                            style="px-6 text-lg"
                            type="submit"
                        />
                    )}
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalReportTransaction