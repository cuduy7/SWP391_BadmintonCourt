"use client"

import ReactPaginate from 'react-paginate'
import { useContext, useState } from 'react'
import ProductContent from './ProductContent'
import { AxiosClient } from '@/services'
import useSWR from 'swr'
import { ListProduct } from '@/types'
import { LoadingFullScreen, Search } from '../../providers'
import Image from 'next/image'
import { GlobalContext } from '@/contexts'

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const ProductItems = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { saveDistrict } = useContext(GlobalContext) || {}

    const { data: listItem, error } = useSWR<ListProduct>(saveDistrict && saveDistrict.name ? `/api/posts/play_ground/${saveDistrict.name}` : `/api/posts/GetListPost`, fetcher, { refreshInterval: 5000 })

    const isLoading = !listItem && !error

    const filterProduct = listItem && listItem.data && listItem.data.filter(product => product.title && product.title.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(filterProduct ? filterProduct.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filterProduct && filterProduct.length > 0 ? filterProduct.slice(startIndex, endIndex) : []

    return (
        <div className="lg:col-span-3 col-span-1 h-auto w-full relative">
            <div className="flex md:flex-row flex-col md:justify-between gap-3 pb-5">
                <h1 className="text-4xl font-semibold text-gray-600 translate-y-0">Danh Sách Sân</h1>
                <Search value={searchTerm} onChange={setSearchTerm} style="w-full md:w-2/4" />
            </div>
            {isLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : listItem && listItem.data.length === 0 ? (
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-4xl text-3xl transition-all duration-500">Không có sân nào cả!</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Vui lòng thử lại sau...</p>
                </div>
            ) : filterProduct && filterProduct.length === 0 ? (
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-4xl text-3xl transition-all duration-500">Sân này không tồn tại!</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Hãy thử tìm kiếm sân khác...</p>
                </div>
            ) : (
                <>
                    {visibleItems.map((item) => (
                        <ProductContent
                            key={item.idPost}
                            idPost={item.idPost}
                            title={item.title}
                            contentPost={item.contentPost}
                            addressSlot={item.addressSlot}
                            days={item.days}
                            startTime={item.startTime}
                            endTime={item.endTime}
                            quantitySlot={item.quantitySlot}
                            highlightUrl={item.highlightUrl}
                            fullName={item.fullName}
                            price={item.price}
                            userId={item.userId}
                            userImgUrl={item.userImgUrl}
                        />
                    ))}
                    {pageCount > 0 && (
                        <div className="flex justify-end mt-10 text-base font-semibold">
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
                    )}
                </>
            )}
        </div>
    )
}

export default ProductItems;
