"use client"

import { useContext, useRef, useState } from "react"
import { Button, LoadingFullScreen, ModalDeleteBlog, Search } from "../providers"
import { removeVietnameseTones, useOutsideClick } from "@/utils"
import { IoMdAdd } from "react-icons/io"
import { useRouter } from "next/router"
import { GlobalContext } from "@/contexts"
import { AxiosClient } from "@/services"
import useSWR from "swr"
import { ListBlogs, ListBlogsData } from "@/types"
import ReactPaginate from "react-paginate"
import { useDeleteBLogModal } from "@/hooks"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

interface TableBlogProps {
    listItem: ListBlogsData[],
    currentPage: number,
    itemsPerPage: number,
}

const TableBLog: React.FC<TableBlogProps> = ({ listItem, currentPage, itemsPerPage }) => {
    const deleteBlogModal = useDeleteBLogModal()
    const [showToggleItemID, setShowToggleItemID] = useState<string | null>(null)
    const startIndex = currentPage * itemsPerPage

    const router = useRouter()

    const handleToggle = (itemID: string) => {
        if (showToggleItemID === itemID) {
            setShowToggleItemID(null)
        } else {
            setShowToggleItemID(itemID)
        }
    }

    const handleOutsideClick = () => {
        setShowToggleItemID(null)
    }

    const ref = useRef<HTMLDivElement | null>(null)
    useOutsideClick(ref, handleOutsideClick)

    const listTitlePostManagement = [
        { title: "#" },
        { title: "ID" },
        { title: "Tên bài viết" },
        { title: "Ngày đăng bài" },
        { title: "Tình trạng" },
        { title: "Lượt truy cập" },
        { title: "Lựa chọn" },
    ]

    const listAction = [
        { title: "Xem bài viết", action: (blogId: string) => router.push(`/blog/${blogId}`) },
        { title: "Xoá bài viết", action: (blogId: string) => deleteBlogModal.onOpen(blogId) },
    ]

    return (
        <table className="table-auto border-collapse text-gray-600 text-center z-[1000] text-sm sm:text-base md:text-lg">
            <thead>
                <tr>
                    {listTitlePostManagement.map((items, index) => (
                        <th className="text-lg font-semibold border border-black border-opacity-10 py-2 md:whitespace-nowrap px-1" key={index}>{items.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="border-b border-black border-opacity-10 font-medium">
                {listItem.map((items, index) => {
                    const totalIndex = startIndex + index + 1

                    return (
                        <tr key={items.id}>
                            <td className="py-3 border-l border-r border-black border-opacity-10">{totalIndex}</td>
                            <td className="py-3 border-l border-r border-black border-opacity-10">{items.id}</td>
                            <td className="py-3 border-r border-black border-opacity-10 max-w-[10rem] md:max-w-md truncate">{items.title}</td>
                            <td className="py-3 border-r border-black border-opacity-10">{items.createTime}</td>
                            <td className="py-3 border-r border-black border-opacity-10">Hoạt động</td>
                            <td className="py-3 border-r border-black border-opacity-10">50</td>
                            <td className="py-3 border-r border-black border-opacity-10 relative">
                                <button className=" cursor-pointer" type="button" onClick={() => handleToggle(items.id)}>
                                    ...
                                </button>
                                {showToggleItemID === items.id && (
                                    <div className="absolute right-[13rem] md:right-[15rem] sm:bottom-4 bottom-5 bg-gray-100 shadow-md rounded-lg w-auto translate-x-full translate-y-full transition p-2 z-[1001] text-left whitespace-nowrap" ref={ref}>
                                        <ul className="space-y-2 list-none">
                                            {listAction.map((item, index) => (
                                                <li className="hover:bg-slate-200 hover:text-primary-blue-cus p-2 cursor-pointer" key={index} onClick={() => item.action(items.id)}>
                                                    {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const PostManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const { user } = useContext(GlobalContext) || {}

    const router = useRouter()

    const { data: listBlogManagement, isLoading, error } = useSWR<ListBlogs>(user ? `/api/blogs/${user.id}` : null, fetcher, { refreshInterval: 10000 })

    const filteredBlogs = listBlogManagement && listBlogManagement.data && listBlogManagement.data.filter(blog => blog.title && removeVietnameseTones(blog.title).includes(removeVietnameseTones(searchTerm)))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(filteredBlogs ? filteredBlogs.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filteredBlogs && filteredBlogs.length > 0 ? filteredBlogs.slice(startIndex, endIndex) : []

    return (
        <>
            <ModalDeleteBlog />
            <section className="relative flex flex-col px-6 py-10">
                <div className="
                        flex 
                        flex-col 
                        text-gray-600 
                        gap-5
                        pb-10
                        md:flex-row 
                        md:justify-between 
                        md:items-center 
                        md:gap-0
                    "
                >
                    <h1 className="font-semibold md:text-4xl text-3xl flex-shrink-0">
                        Quản lý tin tức
                    </h1>
                    <div className="flex gap-3 flex-col md:flex-row transition-all duration-500 flex-wrap justify-end">
                        <div className="flex flex-col space-y-1 md:w-auto w-full transition-all duration-500">
                            <Search value={searchTerm} onChange={setSearchTerm} style="w-full" />
                        </div>
                    </div>
                </div>
                {isLoading ? (
                    <div className="h-screen flex items-center justify-center">
                        <LoadingFullScreen loading={isLoading} />
                    </div>
                ) : !listBlogManagement || !filteredBlogs || listBlogManagement.data.length === 0 ? (
                    <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                        Không có tin tức nào tồn tại
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                        Lỗi API
                    </div>
                ) : filteredBlogs && filteredBlogs.length === 0 ? (
                    <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                        Tin tức này không tồn tại
                    </div>
                ) : (
                    <>
                        <TableBLog listItem={visibleItems} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
                        {pageCount > 0 && (
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
                        )}
                    </>
                )}
            </section>
            {user && user.role && user.role.toLowerCase() === "staff" && (
                <div className="fixed bottom-5 right-5">
                    <Button
                        title="Tạo tin tức"
                        iconLeft={<IoMdAdd size={30} />}
                        style="px-4 py-3"
                        onClick={() => router.push("/admin/create-blog")}
                    />
                </div>
            )}
        </>
    )
}

export default PostManagement