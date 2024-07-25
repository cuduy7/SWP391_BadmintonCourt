"use client"

import { useDeleteBLogModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { DeleteBlogService } from "@/services"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"

const ModalDeleteBlog = () => {
    const deleteBlogModal = useDeleteBLogModal()
    const { user } = useContext(GlobalContext) || {}
    const { setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const handleBanUser = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id && deleteBlogModal.blogId) {
            const res = await DeleteBlogService({
                user_id: user.id,
                blog_id: deleteBlogModal.blogId
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                deleteBlogModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Xóa tin tức thành công!", {
                position: toast.POSITION.TOP_RIGHT
            })

            if (user.role && user.role.toLowerCase() === "admin") {
                mutate("/api/blogs")
            } else {
                mutate(`/api/blogs?user_id=${user.id}`)
            }

            deleteBlogModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={deleteBlogModal.isOpen}
            onClose={deleteBlogModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center">
                <label className="text-gray-600 font-semibold text-3xl">Bạn có chắc chắn muốn xóa tin tức này không?</label>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={deleteBlogModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleBanUser}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalDeleteBlog