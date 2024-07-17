"use client"

import { useSendNoticeUserModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { sendNoticeUserService, updateStatusReportService } from "@/services"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { sendNoticeSchema } from "@/utils"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button, Input } from "../../form"

interface Message {
    value: string
}

const ModalSendNoticeUser = ({ user_id }: { user_id: string }) => {
    const sendNoticeModal = useSendNoticeUserModal()
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}
    const { register, handleSubmit, formState: { errors } } = useForm<Message>({
        resolver: yupResolver(sendNoticeSchema)
    })

    const report_id = sendNoticeModal.reportId

    const handleSendNoticeUser = async (data: Message) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        const res = await sendNoticeUserService({
            user_id: user_id,
            message: data.value
        })

        if (res.data == null) {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            sendNoticeModal.onClose()
            if (setIsLoadingModal) setIsLoadingModal(false)
            return
        }

        toast.success("Gửi nhắc nhở thành công!", {
            position: toast.POSITION.TOP_RIGHT
        })

        if (report_id) {
            await updateStatusReportService(report_id, 2)
            window.location.reload()
        }

        sendNoticeModal.onClose()

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={sendNoticeModal.isOpen}
            onClose={sendNoticeModal.onClose}
            width="md:w-2/4 w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center" onSubmit={handleSubmit(handleSendNoticeUser)}>
                <label className="text-gray-600 font-semibold text-3xl">Gửi nhắc nhở người dùng</label>
                <div className="relative flex flex-col gap-5 text-left w-full">
                    <label className="text-gray-600 text-xl font-semibold">
                        Lý do
                    </label>
                    <Input
                        flagInput
                        placeholder="Nhập văn bản"
                        colorInput="text-xl"
                        name="value"
                        id="value"
                        register={register}
                        errors={errors}
                    />
                </div>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Gửi"
                        style="py-3 px-14 text-xl"
                        type="submit"
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalSendNoticeUser