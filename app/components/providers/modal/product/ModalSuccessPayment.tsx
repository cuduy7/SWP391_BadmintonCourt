"use client"

import { useSuccessPaymentModal } from "@/hooks"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"

const ModalSuccessPayment = () => {
    const router = useRouter()
    const successPaymentModal = useSuccessPaymentModal()
    const { setIsRefresh } = useContext(GlobalContext) || {}

    const handleBackHome = () => {
        router.push("/")
        successPaymentModal.onClose()
    }

    const handleGoToTransaction = () => {
        router.push(`/transaction/detail-transaction/${successPaymentModal.tran_id}`)
        successPaymentModal.onClose()
    }

    return (
        <CustomModal
            isOpen={successPaymentModal.isOpen}
            onClose={() => {
                successPaymentModal.onClose
                if (setIsRefresh) setIsRefresh(true)
            }}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <div className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center">
                <Image
                    src="/images/success.png"
                    alt="success"
                    height={200}
                    width={200}
                    className="object-cover w-24 h-24"
                />
                <label className="text-gray-600 font-semibold text-3xl truncate">Đặt sân thành công</label>
                <p className="text-gray-500 font-normal text-base px-5">Vui lòng xem lại các đặt sân của bạn hoặc có bất kì thắc mắc, vui lòng liên hệ bộ phận hỗ trợ của chúng tôi để được giải đáp sớm nhất.</p>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Xem chi tiết"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={handleGoToTransaction}
                    />
                    <Button
                        title="Trở lại trang chủ"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleBackHome}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default ModalSuccessPayment