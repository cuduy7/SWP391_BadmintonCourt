"use client"

import { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { LoadingActionWallet, LoadingFullScreen } from "../../loader"
import CustomModal from "../Modal"
import { Button } from "../../form"
import { useManagementModal } from "@/hooks/useProduct"
import { AxiosClient, UpdateStatusService } from "@/services"
import { SlotData } from "@/types"
import useSWR from "swr"
import Image from "next/image"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const ModalManagement = () => {
    const managementModal = useManagementModal()
    const { setIsLoadingModal, isLoadingModal, user } = useContext(GlobalContext) || {}
    const post_id = managementModal.postId
    const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: string[] }>({})
    const [checkedStatus, setCheckedStatus] = useState<{ [key: string]: boolean }>({})


    const handleCheckboxChange = (dateSlot: string, slot: string, isChecked: boolean) => {
        setSelectedSlots(prevState => {
            const existingSlots = prevState[dateSlot] || [];
            if (isChecked) {
                return {
                    ...prevState,
                    [dateSlot]: [...existingSlots, slot]
                }
            } else {
                return {
                    ...prevState,
                    [dateSlot]: existingSlots.filter(s => s !== slot)
                }
            }
        })

        setCheckedStatus(prevState => ({ ...prevState, [`${dateSlot}-${slot}`]: isChecked }))
    }

    const { data: listItem, error, isLoading, mutate } = useSWR<SlotData>(`/api/posts/${post_id}/status`, fetcher)

    type OriginalData = {
        [date: string]: string[];
    };

    type FormattedData = {
        dateSlot: string;
        slot: string[];
    };

    const formatSlotData = (data: OriginalData): FormattedData[] => {
        return Object.entries(data).map(([dateSlot, slot]) => ({ dateSlot, slot }));
    };

    const handleUpdateStatus = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        let slotsInfoArray: { dateSlot: string, slot: string[] }[] = []

        if (!selectedSlots || Object.keys(selectedSlots).length === 0) {
            toast.error("Phải chọn chỗ muốn cập nhật", {
                position: toast.POSITION.TOP_RIGHT
            })
            return
        }

        slotsInfoArray = formatSlotData(selectedSlots);

        if (post_id) {
            const res = await UpdateStatusService({
                idPost: post_id,
                idUser: "0",
                postSlot: slotsInfoArray
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Cập nhật trạng thái thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            mutate()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={managementModal.isOpen}
            onClose={managementModal.onClose}
            width="md:w-fit w-full"
            height="h-fit"
        >
            <form className="flex flex-col pb-5 gap-3 w-[60rem]">
                <label className="text-gray-600 font-semibold text-3xl">Quản lý trạng thái sân chơi</label>
                <div className="flex flex-row gap-5 items-center justify-center">
                    <p className="text-gray-700 text-lg">*Lưu ý:</p>
                    <div className="flex flex-row gap-1 items-center">
                        <div className="w-4 h-4 rounded-full bg-gray-500" />
                        <span>Chưa đặt</span>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-500" />
                        <span>Đã đặt</span>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                        <span>Check-in</span>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <div className="w-4 h-4 rounded-full bg-red-500" />
                        <span>Check-out</span>
                    </div>
                </div>
                {isLoading ? (
                    <LoadingFullScreen loading={isLoading} />
                ) : error ? (
                    <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                        <p className="md:text-4xl text-3xl font-semibold">Đã xảy ra lỗi khi tải danh sách chỗ - error 500</p>
                        <div className="relative">
                            <Image
                                src="/images/sad.gif"
                                alt="Gif"
                                width={100}
                                height={100}
                                className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                            />
                        </div>
                    </div>
                ) : !listItem ? (
                    <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                        <p className="md:text-4xl text-3xl font-semibold">Không tìm thấy danh sách chỗ</p>
                        <div className="relative">
                            <Image
                                src="/images/sad.gif"
                                alt="Gif"
                                width={100}
                                height={100}
                                className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col p-4 gap-4 h-[40rem] overflow-auto">
                        {listItem.data.map((item, index) => (
                            <div className="flex flex-col gap-2" key={index}>
                                <div className="text-lg font-semibold">{item.dateSlot}:</div>
                                <div className="grid grid-cols-4 gap-3">
                                    {item.slots.map((slot, slotIndex) => (
                                        <div className="col-span-1 grid grid-cols-4 gap-1 items-center w-40" key={slotIndex}>
                                            <div className="col-span-1">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedStatus[`${item.dateSlot}-${slot.content}`] || false}
                                                    onChange={(e) => handleCheckboxChange(item.dateSlot, slot.content, e.target.checked)}
                                                    className="ring-0 outline-none focus:ring-0 focus:outline-none"
                                                    disabled={slot.status === 0 || slot.status === 3}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <span className="text-gray-600">{slot.content}</span>
                                            </div>
                                            <div className="col-span-1">
                                                {slot.status === 0 ? (
                                                    <div className="w-4 h-4 rounded-full bg-gray-500" />
                                                ) : slot.status === 1 ? (
                                                    <div className="w-4 h-4 rounded-full bg-blue-500" />
                                                ) : slot.status === 2 ? (
                                                    <div className="w-4 h-4 rounded-full bg-green-500" />
                                                ) : (
                                                    <div className="w-4 h-4 rounded-full bg-red-500" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex flex-row gap-5 pt-5 items-center justify-center">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={managementModal.onClose}
                    />
                    <Button
                        title="Có"
                        isHover={false}
                        style="py-3 px-8"
                        onClick={handleUpdateStatus}
                    />
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalManagement