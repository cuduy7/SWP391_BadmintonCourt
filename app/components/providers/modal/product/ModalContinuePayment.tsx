"use client"

import { GlobalContext } from "@/contexts"
import { useForm } from "react-hook-form"
import { buySlotService } from "@/services"
import { useContinuePaymentModal, useFailPaymentModal, useFeaturingModal, useSuccessPaymentModal } from "@/hooks"
import Image from "next/image"
import { useContext } from "react"
import { mutate } from "swr"
import { LoadingActionPayment } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalContinuePayment = () => {
    const { user, setIsLoadingModal, isLoadingModal, setFetchUser } = useContext(GlobalContext) || {}
    const { handleSubmit } = useForm()
    const continuePaymentModal = useContinuePaymentModal()
    const failPaymentModal = useFailPaymentModal()
    const successPaymentModal = useSuccessPaymentModal()
    const featuringModal = useFeaturingModal()

    const onSubmit = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (continuePaymentModal.checkedMethod) {
            continuePaymentModal.onClose()
            featuringModal.onOpen()
            if (setIsLoadingModal) setIsLoadingModal(false)
            return
        }

        if (user && user.id && continuePaymentModal.post_id) {
            console.log(continuePaymentModal.post_id);
            console.log(user.id);
            console.log(continuePaymentModal.slotsIdArray);

            const res = await buySlotService({
                idPost: continuePaymentModal.post_id,
                idUser: user.id,
                postSlot: continuePaymentModal.slotsIdArray
            })

            if (res.data == null) {
                if (setIsLoadingModal) setIsLoadingModal(false)
                continuePaymentModal.onClose()
                failPaymentModal.onOpen(res.message)
                return
            }

            continuePaymentModal.onClose()
            if (setFetchUser) setFetchUser(true)
            successPaymentModal.onOpen(res.data.tranSactionId)
            mutate(`/api/wallet/${user.id}/user_wallet`)
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionPayment loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={continuePaymentModal.isOpen}
            onClose={continuePaymentModal.onClose}
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
                <label className="text-gray-600 font-semibold text-3xl truncate">Bạn có muốn đặt sân không?</label>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={continuePaymentModal.onClose}
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

export default ModalContinuePayment