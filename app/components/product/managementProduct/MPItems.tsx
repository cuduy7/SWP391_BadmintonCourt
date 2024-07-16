"use client"

import ReactPaginate from 'react-paginate'
import { useContext, useState } from 'react'
import { AxiosClient } from '@/services'
import useSWR from 'swr'
import { ManagePost } from '@/types'
import { LoadingFullScreen } from '../../providers'
import Image from 'next/image'
import { GlobalContext } from '@/contexts'
import MPContent from './MPContent'

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const MPItems = () => {
    const { user } = useContext(GlobalContext) || {}

    const { data: listItem, error } = useSWR<ManagePost>(user && user.id ? `/api/posts/${user.id}/managed_all_post` : null, fetcher, { refreshInterval: 10000 })

    const isLoading = !listItem && !error

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 5
    const pageCount = Math.ceil(listItem ? listItem.data.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = listItem && listItem.data.length > 0 ? listItem.data.slice(startIndex, endIndex) : []

    return (
        <>
            {isLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : listItem && listItem.data.length === 0 ? (
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-4xl text-3xl transition-all duration-500">Bạn chưa đăng bài nào cả!</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Vui lòng đăng bài...</p>
                </div>
            ) : (
                <>
                    {visibleItems.map((item) => (
                        <MPContent
                            key={item.postId}
                            postId={item.postId}
                            title={item.title}
                            sortDescript={item.sortDescript}
                            address={item.address}
                            time={item.time}
                            availableSlot={item.availableSlot}
                            postImgUrl={item.postImgUrl}
                            status={item.status}
                            isDelete={item.isDelete}
                            userName={item.userName}
                        />
                    ))}
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

export default MPItems
