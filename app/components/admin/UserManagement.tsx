"use client"

import { useContext, useRef, useState } from "react"
import { DownMetalBtn, LoadingFullScreen, Search } from "../providers"
import { useRouter } from "next/navigation"
import { AxiosClient } from "@/services"
import useSWR from "swr";
import { GlobalContext } from "@/contexts"
import { ManageUser, ManageUserData } from "@/types";
import { removeVietnameseTones, useOutsideClick } from "@/utils"
import ReactPaginate from "react-paginate"
import * as XLSX from 'xlsx'

interface TableUserProps {
    listUser: ManageUserData[],
    currentPage: number,
    itemsPerPage: number,
}

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const listTitleUserManagement = [
    { title: "#" },
    { title: "ID" },
    { title: "Họ và tên" },
    { title: "Ngày tạo" },
    { title: "Chức vụ" },
    { title: "Tình trạng" },
    { title: "Lần cập nhật cuối" },
    { title: "Lựa chọn" },
]

const exportToExcel = (listUser: ManageUserData[]) => {
    const headers = listTitleUserManagement.slice(1, 7).map(item => item.title)

    const data = listUser.map(user => [
        user.userId,
        user.fullName,
        user.createDate,
        user.role,
        user.status,
        user.lastLogin,
    ])

    data.unshift(headers)

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    XLSX.writeFile(workbook, "Quản lý người dùng.xlsx")
}

const TableUser: React.FC<TableUserProps> = ({ listUser, currentPage, itemsPerPage }) => {
    const [showToggleItemID, setShowToggleItemID] = useState<number | null>(null)
    const router = useRouter()
    const startIndex = currentPage * itemsPerPage

    const handleToggle = (itemID: number) => {
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

    const listAction = [
        { title: "Xem chi tiết tài khoản", src: (userId: string | null) => `/admin/user-detail-management/${userId}` },
        { title: "Xem trang cá nhân", src: (userId: string | null) => `/user/profile-user/${userId}` },
    ]

    return (
        <table className="table-auto border-separate border border-black border-opacity-10 rounded-lg text-sm sm:text-base md:text-lg text-gray-600 text-center table">
            <thead>
                <tr>
                    {listTitleUserManagement.map((item, index) => (
                        <th className={`
                                font-semibold 
                                py-3 
                                md:whitespace-nowrap
                                px-1
                                ${index < listTitleUserManagement.length - 1 ?
                                "border-r border-b border-black border-opacity-10" :
                                "border-b"
                            }`}
                            key={index}
                        >
                            {item.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="text-base font-medium">
                {listUser.map((user, index) => {
                    const totalIndex = startIndex + index + 1

                    return (
                        <tr key={index}>
                            <td className="py-3 border-r border-black border-opacity-10">{totalIndex}</td>
                            <td className="py-3 border-r border-black border-opacity-10">{user.userId}</td>
                            <td className="py-3 border-r border-black border-opacity-10">{user.fullName}</td>
                            <td className="py-3 border-r border-black border-opacity-10">{user.createDate}</td>
                            <td className="py-3 border-r border-black border-opacity-10">{user.role}</td>
                            <td className="py-3 border-r border-black border-opacity-10">
                                {user.status?.toLowerCase() === "active" ? (
                                    "Hoạt động"
                                ) : (
                                    "Bị khóa"
                                )}
                            </td>
                            <td className="py-3 border-r border-black border-opacity-10">{user.lastLogin}</td>
                            <td className="py-3 relative">
                                <button className=" cursor-pointer" type="button" onClick={() => handleToggle(index)}>
                                    ...
                                </button>
                                {showToggleItemID === index && (
                                    <div className="absolute right-[15rem] md:right-[17rem] lg:right-[18rem] sm:bottom-4 bottom-5 bg-gray-100 shadow-md rounded-lg w-auto translate-x-full translate-y-full transition p-2 z-[1001] text-left whitespace-nowrap" ref={ref}>
                                        <ul className="space-y-2 list-none">
                                            {listAction.map((action, index) => (
                                                <li className="hover:bg-slate-200 hover:text-primary-blue-cus p-2 cursor-pointer" key={index}>
                                                    <button type="button" onClick={() => { router.push(`${action.src(user.userId)}`) }}>
                                                        {action.title}
                                                    </button>
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

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")

    const { user } = useContext(GlobalContext) || {}

    const { data: listManageUser, error, isLoading } = useSWR<ManageUser>(user ? `/api/users/managed/${user.id}` : null, fetcher, { refreshInterval: 10000 })

    const filteredUsers = listManageUser && listManageUser.data && listManageUser.data.filter(user => user.fullName && removeVietnameseTones(user.fullName).includes(removeVietnameseTones(searchTerm)))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 13
    const pageCount = Math.ceil(filteredUsers ? filteredUsers.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filteredUsers && filteredUsers.length > 0 ? filteredUsers.slice(startIndex, endIndex) : []

    if (user && user.role && user.role.toLowerCase() === "staff") {
        return (
            <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                Bạn không đủ quyền hạn!!!
            </div>
        )
    }

    return (
        <div className="relative flex flex-col px-6 py-10">
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
                    Quản lý người dùng
                </h1>
                <div className="flex gap-3 flex-col md:flex-row justify-end flex-wrap transition-all duration-500">
                    <DownMetalBtn onClick={() => {
                        if (listManageUser)
                            exportToExcel(listManageUser.data)
                    }} />
                    <div className="flex flex-col space-y-1 md:w-auto w-full transition-all duration-500">
                        <Search value={searchTerm} onChange={setSearchTerm} style="w-full" />
                    </div>
                </div>
            </div>
            {isLoading ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoading} />
                </div>
            ) : !listManageUser || !filteredUsers || listManageUser.data.length === 0 ? (
                <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                    Không có người dùng nào tồn tại
                </div>
            ) : error ? (
                <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                    Lỗi API
                </div>
            ) : filteredUsers && filteredUsers.length === 0 ? (
                <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                    Người dùng này không tồn tại
                </div>
            ) : (
                <>
                    <TableUser listUser={visibleItems} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
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
        </div>
    )
}

export default UserManagement