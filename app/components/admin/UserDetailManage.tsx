"use client"

import { AxiosClient } from "@/services"
import { UserManagePostData, UserDetailManage } from "@/types"
import { useRouter } from "next/router"
import { IoMdArrowRoundBack } from "react-icons/io"
import useSWR from "swr"
import { Button, LoadingFullScreen, ModalAdminBan, ModalAdminDeletePost, ModalAdminDownRole, ModalAdminUnBan, ModalAdminUpRole, ModalSendNoticeUser } from "../providers"
import { useContext, useRef, useState } from "react"
import { useOutsideClick, validateTitle } from "@/utils"
import { useAdminBanModal, useAdminDeletePostModal, useAdminDownRoleModal, useAdminUnBanModal, useAdminUpRoleModal, useSendNoticeUserModal } from "@/hooks"
import { GlobalContext } from "@/contexts"
import ReactPaginate from "react-paginate"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

// Interface defining the props for the TablePost component
interface TablePostProps {
    listItem: UserManagePostData[]
}

// Functional component for rendering a table of posts
const TablePost: React.FC<TablePostProps> = ({
    listItem
}) => {
    // State for managing the ID of the currently toggled item
    const [showToggleItemID, setShowToggleItemID] = useState<number | null>(null)

    // Custom hook for managing the delete post modal
    const adminDeletePostModal = useAdminDeletePostModal()

    // Hook for handling navigation
    const router = useRouter()

    // Function to handle toggling the display of action buttons for a specific item
    const handleToggle = (itemID: number) => {
        if (showToggleItemID === itemID) {
            setShowToggleItemID(null)
        } else {
            setShowToggleItemID(itemID)
        }
    }

    // Function to handle clicking outside of the toggled item, closing the action buttons
    const handleOutsideClick = () => {
        setShowToggleItemID(null)
    }

    // Reference for the div containing the action buttons
    const ref = useRef<HTMLDivElement | null>(null)

    // Custom hook to detect clicks outside of the ref element
    useOutsideClick(ref, handleOutsideClick)

    // Column titles for the table header
    const listTitleUserDetail = [
        { title: "ID" },
        { title: "Tên bài viết" },
        { title: "Ngày đăng" },
        { title: "Thao tác" }
    ]

    // Actions available for each post item
    const listAction = [
        { title: "Xem bài viết", src: (postId: string) => router.push(`/product/detail-product/${postId}`) },
        { title: "Xoá bài viết", src: (postId: string) => { adminDeletePostModal.onOpen(postId, null) } },
    ]

    return (
        <table className="table-auto border-separate border border-black border-opacity-10 rounded-lg text-lg text-center text-gray-600 bg-[#EFEFEF]">
            <thead>
                <tr>
                    {listTitleUserDetail.map((item, index) => (
                        <th className="font-semibold py-3 border-b border-black border-opacity-10" key={index}>
                            {item.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listItem.map((item, index) => (
                    <tr key={index}>
                        <td className="py-3">{item.id ?? "chưa có"}</td>
                        <td className="py-3">{validateTitle(item.title)}</td>
                        <td className="py-3">{item.postTime ?? "chưa có"}</td>
                        <td className="py-3 relative">
                            <button className=" cursor-pointer" type="button" onClick={() => handleToggle(index)}>
                                ...
                            </button>
                            {showToggleItemID === index && (
                                <div className="absolute right-[13rem] md:right-[17rem] lg:right-[17rem] sm:bottom-4 bottom-5 bg-gray-100 shadow-md rounded-lg w-auto translate-x-full translate-y-full transition p-2 z-[1001] text-left whitespace-nowrap" ref={ref}>
                                    <ul className="space-y-2 list-none">
                                        {listAction.map((action, index) => (
                                            <li className="hover:bg-slate-200 hover:text-primary-blue-cus p-2 cursor-pointer" key={index}>
                                                <button type="button" onClick={() => action.src(item.id ? item.id : "")}>
                                                    {action.title}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


const UserDetailManage = () => {
    const router = useRouter()
    const adminBanModal = useAdminBanModal()
    const adminUnBanModal = useAdminUnBanModal()
    const adminUpRoleModal = useAdminUpRoleModal()
    const adminDownRoleModal = useAdminDownRoleModal()
    const sendNoticeUser = useSendNoticeUserModal()
    const { user } = useContext(GlobalContext) || {}

    const { id } = router.query

    const { data: listPostForUser, error } = useSWR<UserDetailManage>(user && user.id && id ? `/api/users/admin/${user.id}/user/${id}/detail` : null, fetcher, { refreshInterval: 10000 })

    const isLoadingData = !listPostForUser && !error

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(listPostForUser && listPostForUser.data && listPostForUser.data.posts ? listPostForUser.data.posts.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = listPostForUser && listPostForUser.data && listPostForUser.data.posts && listPostForUser.data.posts.length > 0 ? listPostForUser.data.posts.slice(startIndex, endIndex) : []

    const checkAdminToUser = user && user.role && user.role.toLowerCase() === "admin" && listPostForUser && listPostForUser.data.role.toString().toLowerCase() === "user"
    const checkAdminToStaff = user && user.role && user.role.toLowerCase() === "admin" && listPostForUser && listPostForUser.data.role.toString().toLowerCase() === "staff"
    const checkStaffToUser = user && user.role && user.role.toLowerCase() === "staff" && listPostForUser && listPostForUser.data.role.toString().toLowerCase() === "user"

    // if (user && user.role && user.role.toLowerCase() === "staff") {
    //     return (
    //         <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
    //             Bạn không đủ quyền hạn!!!
    //         </div>
    //     )
    // }

    return (
        <div className="relative flex flex-col px-6 py-10 gap-5">
            <ModalAdminBan user_id={id ? id.toString() : ""} />
            <ModalAdminDeletePost user_id={id ? id.toString() : ""} />
            <ModalAdminUnBan user_id={id ? id.toString() : ""} />
            <ModalAdminUpRole user_id={id ? id.toString() : ""} />
            <ModalAdminDownRole user_id={id ? id.toString() : ""} />
            <ModalSendNoticeUser user_id={id ? id.toString() : ""} />
            <div className="
                    flex 
                    text-gray-600 
                    pb-5
                    space-x-3
                    font-semibold
                    items-center
                "
            >
                <button className="relative" type="button" onClick={() => router.back()}>
                    <IoMdArrowRoundBack size={40} />
                </button>
                <h1 className="md:text-4xl text-3xl">
                    Thông tin chi tiết người dùng
                </h1>
            </div>
            <div className="flex justify-between pb-5">
                <div className="text-2xl text-gray-600 font-semibold">
                    {listPostForUser ? listPostForUser.data.fullName : ""}
                </div>
                <div className="text-lg text-gray-500 font-semibold italic">
                    {listPostForUser ? listPostForUser.data.role : ""}
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="text-2xl text-gray-600 font-semibold">
                    Bài viết gần đây
                </div>
                {isLoadingData ? (
                    <LoadingFullScreen loading={isLoadingData} />
                ) : !listPostForUser || listPostForUser.data.posts && listPostForUser.data.posts.length === 0 ? (
                    <div className="flex items-center justify-center text-3xl text-primary-blue-cus font-semibold h-40">
                        Không có sân nào
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center text-3xl text-primary-blue-cus font-semibold h-40">
                        Lỗi API
                    </div>
                ) : (
                    <>
                        <TablePost listItem={visibleItems} />
                        {pageCount > 0 && (
                            <div className="flex justify-center mt-5 text-base font-semibold">
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
            <div className="flex flex-col gap-5">
                <div className="text-2xl text-gray-600 font-semibold">
                    Lựa chọn xử lý
                </div>
                <div className="relative flex gap-3">
                    {checkAdminToUser && (
                        <Button
                            title="Cấp quyền"
                            color="bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700"
                            style="py-1 px-4"
                            onClick={adminUpRoleModal.onOpen}
                        />
                    )}
                    {checkAdminToStaff && (
                        <Button
                            title="Tước quyền"
                            color="bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700"
                            style="py-1 px-4"
                            onClick={adminDownRoleModal.onOpen}
                        />
                    )}
                    {(checkAdminToUser || checkStaffToUser) && (
                        <Button
                            title="Gửi nhắc nhở"
                            color="bg-emerald-500 hover:bg-emerald-700 border-emerald-500 hover:border-emerald-700"
                            style="py-1 px-4"
                            onClick={() => sendNoticeUser.onOpen(null)}
                        />
                    )}
                    {(checkAdminToUser || checkStaffToUser || checkAdminToStaff) && (
                        listPostForUser && listPostForUser.data.isBanded === true && (
                            <Button
                                title="Mở khoá"
                                color="bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700"
                                style="py-1 px-4"
                                onClick={adminUnBanModal.onOpen}
                            />
                        )
                    )}
                    {(checkAdminToUser || checkStaffToUser || checkAdminToStaff) && (
                        listPostForUser && listPostForUser.data.isBanded === false && (
                            <Button
                                title="Khoá tài khoản"
                                color="bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700"
                                style="py-1 px-4"
                                onClick={() => adminBanModal.onOpen(null)}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserDetailManage