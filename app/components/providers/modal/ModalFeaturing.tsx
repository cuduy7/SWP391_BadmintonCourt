"use client"

import { useFeaturingModal } from "@/hooks"
import CustomModal from "./Modal"
import { Button } from "../form"
import Image from "next/image"

const ModalFeaturing = () => {
    const featuringModal = useFeaturingModal()

    return (
        <CustomModal
            isOpen={featuringModal.isOpen}
            onClose={featuringModal.onClose}
            width="md:w-auto w-full"
            height="h-auto"
        >
            <div className="flex flex-col px-10 pb-5 gap-3 justify-center items-center text-primary-blue-cus font-semibold">
                <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                    <h1 className="md:text-5xl text-3xl transition-all duration-500">Tính năng đang được phát triển!</h1>
                    <div className="relative">
                        <Image
                            src="/images/featuring.gif"
                            alt="Gif"
                            width={100}
                            height={100}
                            className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                            priority
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-5 pt-5">
                    <Button
                        title="Trở lại"
                        style="py-3 px-8"
                        onClick={featuringModal.onClose}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default ModalFeaturing