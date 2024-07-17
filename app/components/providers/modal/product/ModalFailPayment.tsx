"use client"

import { useFailPaymentModal } from "@/hooks"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalFailPayment = () => {
    const router = useRouter()
    const failPaymentModal = useFailPaymentModal()

    const handleBackHome = () => {
        router.push("/")
        failPaymentModal.onClose()
    }

    return (
        <CustomModal
            isOpen={failPaymentModal.isOpen}
            onClose={failPaymentModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center">
                <Image
                    src="/images/error.png"
                    alt="error"
                    height={200}
                    width={200}
                    className="object-cover w-24 h-24"
                />
                <label className="text-gray-600 font-semibold text-3xl truncate">Thanh toán không thành công</label>
                <p className="text-gray-500 font-normal text-base px-5">{failPaymentModal.message}</p>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Quay lại trang chủ"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={handleBackHome}
                    />
                    <Button
                        title="Trở lại thanh toán"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={failPaymentModal.onClose}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalFailPayment