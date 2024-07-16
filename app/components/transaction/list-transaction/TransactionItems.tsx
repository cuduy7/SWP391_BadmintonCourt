"use client"

import { useContext, useState } from "react";
import TransactionContent from "./TransactionContent";
import ReactPaginate from "react-paginate";
import { AxiosClient } from "@/services";
import { GlobalContext } from "@/contexts";
import { ListTransaction } from "@/types";
import useSWR from "swr";
import Image from "next/image";
import { LoadingFullScreen } from "../../providers";

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const TransactionItems = () => {
    const { user } = useContext(GlobalContext) || {}

    const { data: listItem, error } = useSWR<ListTransaction>(user && user.id ? `/api/posts/user/${user.id}/joined` : null, fetcher, { refreshInterval: 10000 })

    const isLoading = !listItem && !error

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10

    // const filteredListItem = listItem ? listItem.data.filter(item => item.status.trim().toLowerCase() !== "đã hủy !".trim()) : [];
    
    const pageCount = Math.ceil(listItem ? (listItem.data.length / itemsPerPage):0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = listItem ? listItem.data.slice(startIndex, endIndex) :[]

    return (
        <>
            {isLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : listItem && listItem.data.length === 0 ? (
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-4xl text-3xl transition-all duration-500 text-center">Bạn chưa có hóa đơn nào cả!</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Vui lòng thực hiện giao dịch để có hóa đơn</p>
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-5">
                        {visibleItems.map((item) => (
                            <TransactionContent
                                key={item.transacionId}
                                transacionId={item.transacionId}
                                postId={item.postId}
                                areaName={item.areaName}
                                availableSlot={item.availableSlot}
                                bookedInfos={item.bookedInfos}
                                coverImage={item.coverImage}
                                startTime={item.startTime}
                                endTime={item.endTime}
                                postTitle={item.postTitle}
                                moneyPaid={item.moneyPaid}
                                status={item.status}
                                chatRoomId={item.chatRoomId}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center mt-10 text-base font-semibold">
                        <ReactPaginate
                            pageCount={pageCount}
                            pageRangeDisplayed={4}
                            marginPagesDisplayed={1}
                            onPageChange={handlePageChange}
                            containerClassName="pagination flex p-0 m-0"
                            activeClassName="text-gray-400 bg-gray-200"
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="border-2 px-4 py-2"
                            previousClassName="border-2 px-4 py-2"
                            nextClassName="border-2 px-4 py-2"
                            pageLinkClassName="pagination-link"
                            nextLinkClassName="pagination-link"
                            breakClassName="pagination-items border-2 px-3 py-2"
                        />
                    </div>
                </>
            )}
        </>
    )
}

export default TransactionItems