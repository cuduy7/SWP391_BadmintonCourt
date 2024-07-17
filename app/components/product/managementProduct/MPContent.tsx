"use client"

import Image from "next/image"
import { Button } from "../../providers"
import { ListRoom, ManagePostData } from "@/types"
import { FormatTime, formatDateFunc, validateAddress, validateDes, validateTitle, validateURLProduct } from "@/utils"
import { RiMessage3Line } from "react-icons/ri"
import { useRouter } from "next/navigation"
import { useAdminDeletePostModal, useBoostProductModal, useRoomByProductModal } from "@/hooks"
import { AxiosClient } from "@/services"
import useSWR from "swr"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { useManagementModal, useUpdateProductModal } from "@/hooks/useProduct"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const MPContent: React.FC<ManagePostData> = ({
    postId,
    title,
    sortDescript,
    address,
    time,
    availableSlot,
    postImgUrl,
    status,
    isDelete,
    userName
}) => {
    const managementModal = useManagementModal()
    const adminDeletePostModal = useAdminDeletePostModal()
    const updateProductModal = useUpdateProductModal()
    const router = useRouter()

    // let date: string | undefined;
    // let rangeTime: string | undefined;
    // let startTime: string | undefined;
    // let endTime: string | undefined;

    // if (time) {
    //     [date, rangeTime] = time.split(": ")
    //     if (rangeTime) {
    //         [startTime, endTime] = rangeTime.split(" - ")
    //     }
    // }

    return (
        <div className="lg:grid lg:grid-cols-4 flex flex-col gap-3 transition-all duration-500" key={postId}>
            <div className="relative lg:col-span-3 border border-black border-opacity-10 rounded-xl transition-all duration-500">
                <div className="md:grid md:grid-cols-9 flex flex-col gap-3 transition-all duration-500">
                    <div className="col-span-4 relative md:h-full h-96 transition-all duration-500">
                        <Image
                            src={validateURLProduct(postImgUrl)}
                            alt="product"
                            sizes="(max-width: 600px) 100vw, 600px"
                            className="object-cover md:rounded-l-xl md:rounded-r-none rounded-t-xl w-auto h-auto transition-all duration-500"
                            fill
                            placeholder="blur"
                            blurDataURL={validateURLProduct(postImgUrl)}
                        />
                    </div>
                    <section className="col-span-5 flex flex-col gap-3 text-lg text-gray-600 p-3 h-full justify-center">
                        <h1 className="text-2xl font-semibold truncate">
                            {validateTitle(title)}
                        </h1>
                        <section className="line-clamp-3 h-[5rem] space-x-1">
                            <span className="text-gray-500 font-semibold">
                                Mô tả ngắn:
                            </span>
                            <span>
                                {validateDes(sortDescript)}
                            </span>
                        </section>
                        <section className="space-x-1 transition duration-500">
                            <span className="text-gray-500 font-semibold">
                                Địa chỉ:
                            </span>
                            <span className="">
                                {validateAddress(address)}
                            </span>
                        </section>
                        <section className="flex space-x-1 truncate">
                            <label className="text-gray-500 font-semibold">
                                Thời gian:
                            </label>
                            <p>
                                {time}
                            </p>
                        </section>
                        <section className="space-x-1 gap-1">
                            <label className="text-gray-500 font-semibold">
                                Người quản lý:
                            </label>
                            <span>
                                {userName}
                            </span>
                        </section>
                        <section className="flex space-x-1">
                            <span className="text-gray-500 font-semibold">
                                Số lượng chỗ còn:
                            </span>
                            <span>
                                {availableSlot ?? 0}
                            </span>
                        </section>
                    </section>
                </div>
            </div>
            <div className="relative lg:col-span-1 p-3 h-full border border-black border-opacity-10 rounded-xl transition duration-500">
                <div className="flex flex-col gap-3 justify-center items-center">
                    <div className="flex lg:flex-col lg:gap-3 lg:space-x-0 flex-row space-x-3">
                        {/* <div className="text-2xl font-semibold text-primary-blue-cus text-center">
                            100.000 VND/Chỗ
                        </div> */}
                        <div className="flex xl:flex-row lg:flex-col space-x-1 text-lg items-center flex-wrap justify-center">
                            <span className="text-gray-600">
                                Tình trạng bài viết:
                            </span>
                            {!isDelete ? (
                                status ? (
                                    <span className="text-green-600 font-semibold">
                                        Đang hoạt động
                                    </span>
                                ) : (
                                    <span className="text-primary-blue-cus font-semibold">
                                        Đã ẩn
                                    </span>
                                )
                            ) : (
                                <span className="text-red-600 font-semibold">
                                    Hết hoạt động
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="relative w-full grid grid-cols-2 gap-3 md:gap-0 md:flex md:space-x-3 lg:flex-col lg:gap-3 lg:space-x-0 ">
                        <div className="relative w-full col-span-1">
                            <Button
                                title="Xoá bài đăng"
                                style="w-full justify-center items-center px-2"
                                onClick={() => {
                                    if (postId)
                                        adminDeletePostModal.onOpen(postId, null)
                                }}
                            />
                        </div>
                        <div className="relative w-full col-span-1">
                            <Button
                                title="Cập nhật bài đăng"
                                style="w-full justify-center items-center px-2"
                                onClick={() => {
                                    if (postId) {
                                        updateProductModal.onOpen(postId)
                                    }
                                }}

                            />
                        </div>
                        <div className="relative w-full col-span-1">
                            <Button
                                title="Quản lý trạng thái"
                                style="w-full justify-center items-center px-2"
                                onClick={() => {
                                    if (postId)
                                        managementModal.onOpen(postId)
                                }}
                            />
                        </div>
                        <div className="relative w-full col-span-1">
                            <Button
                                title="Xem bài đăng"
                                style="w-full justify-center items-center px-2"
                                onClick={() => router.push(`/product/detail-product/${postId}`)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MPContent