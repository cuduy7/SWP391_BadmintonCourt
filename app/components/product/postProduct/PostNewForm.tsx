"use client"

import ThumbGallery from "./ThumbsGallery"
import Select from "react-select"
import { Button, Loading } from "../../providers"
import Input from "../../providers/form/Input"
import Datepicker from "react-tailwindcss-datepicker"
import { useContext, useState } from "react"
import { addDays, addMonths, differenceInDays, eachDayOfInterval, format, isSameDay, setHours, setMinutes, startOfDay } from 'date-fns'
import { vi } from 'date-fns/locale'
import { AxiosClient, postBadmintonService } from "@/services"
import useSWR, { mutate } from "swr"
import { ListCity } from "@/types"
import { customStyles, handleChange, processBase64Image } from "@/utils"
import { useForm } from "react-hook-form"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { usePolicyModal } from "@/hooks"

interface Option {
    id: string;
    value: string;
    label: string
}

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const PostNewForm = () => {
    const [formGlobal, setFormGlobal] = useState({
        title: "",
        description: "",
        price: 0
    })
    const [uploadImages, setUploadImages] = useState<string[]>([])
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    })
    const [selectedDays, setSelectedDays] = useState<Date[]>([])
    const [selectCity, setSelectedCity] = useState<Option | null>(null)
    const [showDateField, setShowDateField] = useState(false)
    const [slots, setSlots] = useState<{ day: Date }[]>([])
    const router = useRouter()
    const policyModal = usePolicyModal()

    const { handleSubmit } = useForm()

    const { user, isLoading, setIsLoading } = useContext(GlobalContext) || {}

    //Chọn phạm vi ngày
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

    const { data: listCity, error: errorCity } = useSWR<ListCity>(`/api/cities`, fetcher)
    if (errorCity) toast.error(listCity?.message, {
        position: toast.POSITION.TOP_RIGHT
    })
    const optionCity = listCity?.data.map(city => ({ id: city.id, value: city.name, label: city.name })) || []

    const handleCityChange = (newValue: Option | null) => {
        if (newValue) {
            setSelectedCity(newValue)
        }
    }

    const onSubmit = async () => {
        if (setIsLoading) setIsLoading(true)

        if (!uploadImages[0] || !selectCity || !dateRange.endDate
            || !dateRange.startDate || selectedDays.length === 0 || !formGlobal.title || formGlobal.title.trim() === ""
            || formGlobal.title.length > 10 || formGlobal.title.length < 100 || !formGlobal.description || formGlobal.description.trim() === ""
            || formGlobal.description.length > 50 || formGlobal.description.length < 500 || formGlobal.price < 10000) {

            if (!uploadImages[0]) {
                toast.error("Ảnh không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            } else if (!formGlobal.title || formGlobal.title.trim() === "") {
                toast.error("Tên bài đăng không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (formGlobal.title.length < 10 || formGlobal.title.length > 100) {
                toast.error("Tên bài đăng từ 10-100 ký tự", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (!selectCity) {
                toast.error("Chi nhánh không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (!dateRange.endDate || !dateRange.startDate) {
                toast.error("Phạm vi ngày không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (selectedDays.length === 0) {
                toast.error("Chọn ngày không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (!formGlobal.description || formGlobal.description.trim() === "") {
                toast.error("Mô tả không được để trống", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            } else if (formGlobal.description.length < 50 || formGlobal.description.length > 500) {
                toast.error("Mô tả từ 50-500 ký tự", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            if (formGlobal.price < 10000) {
                toast.error("Giá tiền phải lớn hơn 10.000VNĐ", {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }
        }


        const processedImages = uploadImages.map(image => processBase64Image(image))

        if (user && user.id) {
            const formattedSelectedDays = selectedDays.map(day => format(new Date(day), 'dd/MM/yyyy'));

            const res = await postBadmintonService({
                id: user.id,
                title: formGlobal.title,
                address: selectCity.value,
                slots: {
                    TimeSlot: formattedSelectedDays,
                    Price: formGlobal.price
                },
                description: formGlobal.description,
                highlightUrl: processedImages[0],
                imgUrls: processedImages
            })

            console.log(res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(false)
                return
            }

            toast.success("Đăng bài thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            mutate("/posts/GetListPost")
            router.push("/")
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <form className="grid lg:grid-cols-2 grid-cols-1 gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-1">
                <ThumbGallery setImages={setUploadImages} />
            </div>
            <div className="col-span-1">
                <div className="relative">
                    <div className="flex flex-col gap-8">
                        <div className="grid grid-cols-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="text-lg font-semibold text-gray-600">Tên sân:</label>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    id="title"
                                    name="title"
                                    colorInput="bg-[#F5F5F5] border-none"
                                    type="text"
                                    maxLength={100}
                                    value={formGlobal.title}
                                    onChange={(e) => handleChange(e, setFormGlobal)}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="text-lg font-semibold text-gray-600">Chi nhánh:</label>
                            </div>
                            <div className="col-span-2">
                                <Select
                                    name="city"
                                    options={optionCity}
                                    styles={customStyles}
                                    instanceId="listCity"
                                    placeholder="Chọn Chi Nhánh"
                                    onChange={handleCityChange}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 items-center">
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
                            <div className="grid grid-cols-3 gap-3 items-center">
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
                        <div className="grid grid-cols-3 gap-3 items-center">
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
                        <div className="grid grid-cols-3 gap-3 items-center">
                            <div className="col-span-1">
                                <label className="text-lg font-semibold text-gray-600">Mô tả:</label>
                            </div>
                            <div className="col-span-2">
                                <Input
                                    flagInput
                                    id="description"
                                    name="description"
                                    colorInput="bg-[#F5F5F5] border-none"
                                    type="text"
                                    value={formGlobal.description}
                                    onChange={(e) => handleChange(e, setFormGlobal)}
                                    maxLength={500}
                                />
                            </div>
                        </div>
                        {user && user.role && user.role.toLowerCase() === "user" ? (
                            <></>
                        ) : (
                            <div className="grid lg:grid-cols-3 grid-cols-1">
                                <div className="lg:col-span-1" />
                                <div className="lg:col-span-2 col-span-1 py-4 flex justify-center">
                                    {isLoading ? (
                                        <Button
                                            title={<Loading loading={isLoading} color="white" />}
                                            style="px-16 py-3 text-xl"
                                            type="submit"
                                            isHover={false}
                                        />
                                    ) : (
                                        <Button
                                            title="Đăng bài"
                                            style="px-16 py-3 text-xl"
                                            type="submit"
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostNewForm