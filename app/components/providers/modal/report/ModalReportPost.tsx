"use client"

import { useReportPostModal } from "@/hooks"
import { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { reportPostService } from "@/services"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { Loading } from "../../loader"

const ModalReportPost = ({ id }: { id: string }) => {
    const reportPostModal = useReportPostModal()
    const [selectedReport, setSelectedReport] = useState({
        label: "",
        value: ""
    })
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}
    const { handleSubmit } = useForm()

    const listReport = [
        { label: "VI PHẠM NỘI DUNG", value: "Nội dung bài đăng bao gồm hình ảnh có nội dung hoặc yếu tố không phù hợp (khiêu dâm, bạo lực, chính trị, ...)" },
        { label: "LỪA ĐẢO", value: "Lừa đảo" },
        { label: "TRÙNG BÀI ĐĂNG", value: "Bài đăng đã bị trùng với bài đăng khác" },
        { label: "KHÔNG THỂ LIÊN HỆ", value: "Không thể liên hệ với người đăng bài" },
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

        if (user && user.id && id) {
            const res = await reportPostService({
                user_id: user.id,
                post_id: id,
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

            toast.success("Tố cáo thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            reportPostModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    return (
        <CustomModal
            isOpen={reportPostModal.isOpen}
            onClose={reportPostModal.onClose}
            title="Báo cáo bài đăng"
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
                            disabled={user ? user.id?.toString() === id.toString() : false}
                        />
                    )}
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalReportPost