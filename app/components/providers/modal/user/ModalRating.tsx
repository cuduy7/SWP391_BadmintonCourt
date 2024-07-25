"use client"

import { useRatingModal } from "@/hooks"
import CustomModal from "../Modal"
import { RatingFilter } from "../../format"
import { Button, Input } from "../../form"

const ModalRating = () => {
    const ratingModal = useRatingModal()

    return (
        <CustomModal
            isOpen={ratingModal.isOpen}
            onClose={() => {
                ratingModal.onClose()
                window.location.reload()
            }}
            width="w-full lg:w-2/4 md:3/4 max-w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 w-full justify-center items-center" >
                <label className="text-gray-600 font-semibold text-3xl truncate">Đánh giá người dùng</label>
                <div className="flex flex-col gap-3 relative w-full">
                    <div className="flex gap-5 w-full relative flex-wrap  justify-between">
                        <div className="text-2xl font-semibold">
                            Chủ sân: {ratingModal.name}
                        </div>
                        <div className="flex flex-wrap gap-3 text-xl font-medium text-gray-gray-600 text-left justify-between">
                            <div className="grid grid-cols-2 gap-3">
                                <label className="col-span-1">Kĩ năng:</label>
                                <div className="col-span-1">
                                    <RatingFilter onChange={() => { }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="col-span-1">Thân thiện:</label>
                                <div className="col-span-1">
                                    <RatingFilter onChange={() => { }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="col-span-1">Tin tưởng:</label>
                                <div className="col-span-1">
                                    <RatingFilter onChange={() => { }} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <label className="col-span-1">Hỗ trợ:</label>
                                <div className="col-span-1">
                                    <RatingFilter onChange={() => { }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <Input
                            flagInput
                            colorInput="w-full text-xl"
                            placeholder="Nhập lời bình luận..."
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Gửi"
                        style="py-2 px-12 text-xl"
                        onClick={() => {
                            ratingModal.onClose()
                            window.location.reload()
                        }}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalRating