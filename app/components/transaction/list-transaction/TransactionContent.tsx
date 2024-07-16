"use client"

import Image from "next/image"
import { Button } from "../../providers"
import { ListTransactionData } from "@/types"
import { useRouter } from "next/navigation"
import { formatDateFunc, formatTimeFunc, validateAddress, validateTitle, validateURLProduct } from "@/utils"
import { format, parse } from "date-fns"
import { useReportTransactionModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"

const TransactionContent: React.FC<ListTransactionData> = ({
    postId,
    transacionId,
    postTitle,
    coverImage,
    status,
    areaName,
    bookedInfos,
    availableSlot,
}) => {
    const router = useRouter()

    const totalSlots = bookedInfos.reduce((count, info) => count + info.slot.length, 0);

    return (
        <div className="lg:grid lg:grid-cols-12 flex flex-col rounded-lg border border-black border-opacity-10 transition-all duration-500 h-[20rem]" key={transacionId}>
            <div className="lg:col-span-4 relative lg:h-full md:h-96 sm:h-80 h-72 transition duration-300">
                <Image
                    src={validateURLProduct(coverImage)}
                    alt="image"
                    sizes="(max-width: 600px) 100vw, 600px"
                    placeholder="blur"
                    blurDataURL={validateURLProduct(coverImage)}
                    fill
                    className="object-cover lg:rounded-l-lg rounded-t-lg lg:rounded-r-none transition-all duration-500"
                />
            </div>
            <div className="lg:col-span-8 p-6 flex flex-col gap-3 h-full justify-around">
                <div className="flex md:flex-row flex-col md:justify-between md:items-center md:gap-0 gap-2 transition-all duration-500">
                    <div className="md:text-3xl text-2xl font-semibold text-gray-600">
                        {validateTitle(postTitle)}
                    </div>
                    <div className={"text-xl font-semibold text-primary-blue-cus"}>
                        {status}
                    </div>
                </div>
                <section className="space-x-3 text-xl">
                    <span>
                        Địa chỉ:
                    </span>
                    <span>
                        {validateAddress(areaName)}
                    </span>
                </section>
                <div className="space-x-3 text-xl">
                    <span>
                        Ngày chơi:
                    </span>
                    {bookedInfos.map((book) => (
                        <span>
                            {book.dateSlot};
                        </span>
                    ))}
                    <span>
                        {/* {formatTimeFunc(formatStartTime.toString())} - {formatTimeFunc(formatEndTime.toString())} */}
                    </span>
                </div>
                <section className="space-x-3 text-xl">
                    <span>
                        Tổng số slot:
                    </span>
                    <span>
                        {totalSlots}
                    </span>
                </section>
                <div className="flex w-full xl:gap-3 gap-2 flex-wrap lg:flex-nowrap transition-all duration-500">
                    {/* <Button
                        title="Báo cáo"
                        style="text-lg px-4 white whitespace-nowrap"
                        onClick={() => reportTransactionModal.onOpen(transacionId)}
                    /> */}
                    <Button
                        title="Đặt sân tiếp"
                        style="text-lg px-4 whitespace-nowrap"
                        onClick={() => router.push(`/product/detail-product/${postId}`)}
                    />
                    {/* <Button
                        title="Nhắn tin"
                        style="text-lg px-4 whitespace-nowrap"
                        onClick={() => {
                            if (setRoomId) setRoomId(chatRoomId)
                            router.push("/user/chat-room")
                        }}
                    /> */}
                    {!(status.trim().toLowerCase() === "đã hủy !".trim()) && (
                        <Button
                            title="Xem chi tiết"
                            style="text-lg px-4 whitespace-nowrap"
                            onClick={() => router.push(`/transaction/detail-transaction/${transacionId}`)}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionContent