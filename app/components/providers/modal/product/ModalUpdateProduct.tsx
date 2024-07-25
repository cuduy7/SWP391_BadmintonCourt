"use client"

import { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { UpdateService, boostProductService } from "@/services"
import { mutate } from "swr"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button, Input } from "../../form"
import { useUpdateProductModal } from "@/hooks/useProduct"
import Datepicker from "react-tailwindcss-datepicker"
import { addDays, addMonths, differenceInDays, eachDayOfInterval, format, isSameDay, startOfDay } from "date-fns"
import { handleChange } from "@/utils"
import { vi } from "date-fns/locale"
import { useForm } from "react-hook-form"

const ModalUpdateProduct = () => {
    const [formGlobal, setFormGlobal] = useState({
        price: 0
    })
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    })
    const [selectedDays, setSelectedDays] = useState<Date[]>([])
    const [showDateField, setShowDateField] = useState(false)
    const [slots, setSlots] = useState<{ day: Date }[]>([])
    const updateProductModal = useUpdateProductModal()
    const { user, setIsLoadingModal, isLoadingModal, listSetting } = useContext(GlobalContext) || {}
    const post_id = updateProductModal.postId
    const { handleSubmit } = useForm()

    const handleDateChange = (newValue: any) => {
        const { startDate, endDate } = newValue;
        if (startDate && endDate) {
            const diffInDays = differenceInDays(new Date(endDate), new Date(startDate));
            if (diffInDays > 7) {
                toast.error('Khoản cách giữa ngày bắt đầu và ngày kết thúc không được vượt quá 7 ngày', {
                    position: toast.POSITION.TOP_RIGHT
                })
                setDateRange({ startDate: null, endDate: null })
                setShowDateField(false)
                setSlots([])
                return
            }
        }

        if (startDate == null || endDate == null) {
            setShowDateField(false)
            setSlots([])
            return
        }

        setDateRange(newValue)
        setSelectedDays([])
        setSlots([])
        setShowDateField(true)
    }
    //Chọn ngày
    const handleDayClick = (day: Date) => {
        const existingDay = selectedDays.find(selectedDate => isSameDay(selectedDate, day))
        if (existingDay) {
            setSelectedDays(prevDays => prevDays.filter(selectedDate => !isSameDay(selectedDate, day)))
            setSlots(prevSlots => prevSlots.filter(slot => slot.day.toISOString() !== day.toISOString()))
        } else if (dateRange.startDate && dateRange.endDate) {
            const diffInDays = differenceInDays(new Date(dateRange.endDate), new Date(dateRange.startDate)) + 1
            if (selectedDays.length < diffInDays) {
                setSelectedDays(prevDays => [...prevDays, day])
            }
        }
    }

    const handleUpdatePost = async () => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (!dateRange.endDate || !dateRange.startDate || selectedDays.length === 0 || formGlobal.price < 10000) {
            if (!dateRange.endDate || !dateRange.startDate) {
                toast.error("Phạm vi ngày không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            if (selectedDays.length === 0) {
                toast.error("Chọn ngày không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            if (formGlobal.price < 10000) {
                toast.error("Giá tiền phải lớn hơn 10.000VNĐ", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }
        }

        if (post_id) {
            const formattedSelectedDays = selectedDays.map(day => format(new Date(day), 'dd/MM/yyyy'));

            const res = await UpdateService({
                id: post_id,
                slots: {
                    TimeSlot: formattedSelectedDays,
                    Price: formGlobal.price
                }
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                updateProductModal.onClose()
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Cập nhật sân cầu lông thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            if (user) mutate(`/api/posts/${user.id}/managed_all_post`)
            updateProductModal.onClose()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={updateProductModal.isOpen}
            onClose={updateProductModal.onClose}
            width="md:w-2/4 w-full"
            height="h-fit"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-10 h-3/4 justify-between items-center w-full" onSubmit={handleSubmit(handleUpdatePost)}>
                <label className="text-gray-600 font-semibold text-3xl">Cập nhật sân cầu lông</label>
                <div className="grid grid-cols-3 gap-3 items-center w-full">
                    <div className="col-span-1">
                        <label className="text-lg font-semibold text-gray-600">Phạm vi ngày:</label>
                    </div>
                    <div className="col-span-2">
                        <Datepicker
                            i18n={"vi"}
                            value={dateRange}
                            onChange={handleDateChange}
                            primaryColor={"blue"}
                            displayFormat={"DD/MM/YYYY"}
                            inputClassName="light w-full bg-[#F5F5F5] border-none py-3 px-6 focus:ring-0 rounded-lg"
                            minDate={startOfDay(addDays(new Date(), 1))}
                            maxDate={addMonths(new Date(), 1)}
                            showShortcuts={true}
                            configs={{
                                shortcuts: {
                                    Today: {
                                        text: "Ngày tiếp theo",
                                        period: {
                                            start: addDays(new Date(), 1),
                                            end: addDays(new Date(), 1),
                                        }
                                    },
                                    next3Days: {
                                        text: "Chọn 3 ngày",
                                        period: {
                                            start: addDays(new Date(), 1),
                                            end: addDays(new Date(), 3)
                                        },
                                    },
                                    next5Days: {
                                        text: "Chọn 5 ngày",
                                        period: {
                                            start: addDays(new Date(), 1),
                                            end: addDays(new Date(), 5)
                                        },
                                    },
                                    next7Days: {
                                        text: "Chọn 7 ngày",
                                        period: {
                                            start: addDays(new Date(), 1),
                                            end: addDays(new Date(), 7)
                                        },
                                    }
                                },
                            }}
                        />
                    </div>
                </div>
                {showDateField && (
                    <div className="grid grid-cols-3 gap-3 items-center w-full">
                        <div className="col-span-1">
                            <label className="text-lg font-semibold text-gray-600">Chọn Ngày:</label>
                        </div>
                        <div className="col-span-2">
                            {dateRange.startDate && dateRange.endDate && (
                                <div className="flex flex-row flex-wrap gap-3">
                                    {eachDayOfInterval({
                                        start: new Date(dateRange.startDate),
                                        end: new Date(dateRange.endDate)
                                    }).map((date, index) => (
                                        <div
                                            key={index}
                                            title={format(date, 'dd/MM/yyyy')}
                                            onClick={() => handleDayClick(date)}
                                            className={`
                                                    border 
                                                    border-black 
                                                    border-opacity-10 
                                                    whitespace-nowrap 
                                                    px-2 
                                                    py-1 
                                                    font-semibold 
                                                    ${selectedDays.find(selectedDate =>
                                                isSameDay(selectedDate, date)) ?
                                                    'bg-primary-blue-cus text-white' :
                                                    'text-primary-blue-cus bg-white'}
                                                    `}
                                        >
                                            {format(date, 'EEEE', { locale: vi })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-3 gap-3 items-center w-full">
                    <div className="col-span-1">
                        <label className="text-lg font-semibold text-gray-600">Giá:</label>
                    </div>
                    <div className="col-span-2">
                        <Input
                            id="price"
                            name="price"
                            colorInput="bg-[#F5F5F5] border-none"
                            type="number"
                            maxLength={100}
                            value={formGlobal.price}
                            onChange={(e) => handleChange(e, setFormGlobal)}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-5">
                    <Button
                        title="Không"
                        color="border-primary-blue-cus bg-white"
                        text="text-primary-blue-cus"
                        style="py-3 px-8"
                        onClick={updateProductModal.onClose}
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

export default ModalUpdateProduct