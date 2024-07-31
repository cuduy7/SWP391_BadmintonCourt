"use client"

import { useBoostProductModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext, SettingNames } from "@/contexts"
import { toast } from "react-toastify"
import { boostProductService } from "@/services"
import { mutate } from "swr"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { formatMoney } from "@/utils"
import Decimal from "decimal.js"

const ModalBoostProduct = () => {
    const boostProductModal = useBoostProductModal() // State and methods for the modal
    const { user, setIsLoadingModal, isLoadingModal, listSetting } = useContext(GlobalContext) || {} // Global context values
    const post_id = boostProductModal.postId // ID of the post to be boosted

    // Find the boost post setting in the list of settings
    const boostPostSetting = listSetting && listSetting.find(setting => setting.settingName === SettingNames.BoostPostFree)

    // Handle boosting the post
    const handleDeletePost = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true) // Show loading indicator

        if (user && user.id && post_id) {
            const res = await boostProductService(user.id, post_id) // Call the service to boost the post

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                }) // Show error message
                boostProductModal.onClose() // Close the modal
                if (setIsLoadingModal) setIsLoadingModal(false) // Hide loading indicator
                return
            }

            toast.success("Đẩy bài đăng thành công", {
                position: toast.POSITION.TOP_RIGHT
            }) // Show success message

            mutate("/posts/GetListPost") // Refresh the post list
            boostProductModal.onClose() // Close the modal
        }

        if (setIsLoadingModal) setIsLoadingModal(false) // Hide loading indicator
    }

    // Show loading indicator if the modal is in a loading state
    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={boostProductModal.isOpen}
            onClose={boostProductModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn đẩy bài đăng này không?</label>
                <p className="text-gray-500 font-normal text-base px-5">
                    Phí đẩy bài {formatMoney(new Decimal(boostPostSetting ? boostPostSetting.settingAmount : 0))}
                </p>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={boostProductModal.onClose}
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

export default ModalBoostProduct