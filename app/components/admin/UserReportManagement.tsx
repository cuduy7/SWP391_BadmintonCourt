"use client"

import { useContext, useRef, useState } from "react"
import { LoadingFullScreen, Search } from "../providers"
import { removeVietnameseTones, useOutsideClick } from "@/utils"
import { GlobalContext } from "@/contexts"
import { UserReportManagement, UserReportManagementData } from "@/types"
import { AxiosClient } from "@/services"
import useSWR from "swr"
import ReactPaginate from "react-paginate"
import { useRouter } from "next/router"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)
interface TableUserReportProps {
    listItem: UserReportManagementData[],
    selected: string,
    currentPage: number,
    itemsPerPage: number,
}

const options = [
    { value: 0, label: 'Bài đăng' },
    { value: 1, label: 'Hóa đơn' },
    { value: 2, label: 'Người dùng' }
]

const TableUserReport: React.FC<TableUserReportProps> = ({
    listItem,
    selected,
    currentPage,
    itemsPerPage
}) => {
    const router = useRouter()
    const [showToggleItemID, setShowToggleItemID] = useState<string | null>(null)
    const startIndex = currentPage * itemsPerPage

    const handleToggle = (itemID: string) => {
        if (showToggleItemID === itemID) {
            setShowToggleItemID(null)
        } else {
            setShowToggleItemID(itemID)
        }
    }

    const handleOutsideClick = () => {
        setShowToggleItemID(null);
    }

    const ref = useRef<HTMLDivElement | null>(null)
    useOutsideClick(ref, handleOutsideClick)

    const listTitleReportManagement = [
        { title: "#" },
        { title: "ID" },
        { title: "Lỗi vi phạm" },
        { title: "Nội dung" },
        { title: "Ngày nhận" },
        { title: "Tình trạng" },
        { title: "Lựa chọn" },
    ]

    const listAction = [
        {
            title: "Xem chi tiết",
            action: (id: string, report_type: string) => {
                router.push({
                    pathname: `/admin/user-report-detail/${id}`,
                    query: { report_type: report_type },
                });
            },
        }
    ]

    return (
        <table className="table-auto border-collapse text-gray-600 text-center z-[1000] text-sm sm:text-base md:text-lg">
            <thead>
                <tr>
                    {listTitleReportManagement.map((items, index) => (
                        <th className="font-semibold border border-black border-opacity-10 py-2 md:whitespace-nowrap px-1" key={index}>{items.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="border-b border-black border-opacity-10 font-medium">
                {listItem.map((items, index) => {
                    const totalIndex = startIndex + index + 1

                    return (
                        <tr key={items.id}>
                            <td className="py-3 border-l border-r border-b border-black border-opacity-10 px-2 align-text-top">{totalIndex}</td>
                            <td className="py-3 border-l border-r border-b border-black border-opacity-10 px-2 align-text-top">{items.id}</td>
                            <td className="py-3 border-r border-b border-black border-opacity-10 px-1 text-left align-text-top">{items.title ?? "Chưa có"}</td>
                            <td className="py-3 border-r border-b border-black border-opacity-10 px-2 text-left align-text-top">{items.content}</td>
                            <td className="py-3 border-r border-b border-black border-opacity-10 px-2 align-text-top">{items.dateReceive}</td>
                            <td className="py-3 border-r border-b border-black border-opacity-10 px-2 align-text-top w-auto whitespace-nowrap">
                                {items.status?.toLowerCase() === "pending" ? (
                                    "Đang xử lý"
                                ) : (
                                    "Đã xử lý"
                                )}
                            </td>
                            <td className="py-3 border-r border-b border-black border-opacity-10 relative">
                                <button className=" cursor-pointer" type="button" onClick={() => handleToggle(items.id)}>
                                    ...
                                </button>
                                {showToggleItemID === items.id && (
                                    <div className="absolute right-[10rem] sm:right-[12rem] md:right-[13rem] sm:bottom-4 bottom-5 bg-gray-100 shadow-md rounded-lg w-auto translate-x-full translate-y-full transition p-2 z-[1001] text-left whitespace-nowrap" ref={ref}>
                                        <ul className="space-y-2 list-none">
                                            {listAction.map((action, idx) => (
                                                <li className="hover:bg-slate-200 hover:text-primary-blue-cus p-2 cursor-pointer" key={idx} onClick={() => action.action(items.id, selected)}>
                                                    {action.title}
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

const UserReportManagement = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { user } = useContext(GlobalContext) || {}
    const [selectOption, setSelectOption] = useState(options[0])

    const { data: listUserReport, error, isLoading } = useSWR<UserReportManagement>(selectOption ? `/api/users/type/${selectOption.value}` : null, fetcher, { refreshInterval: 10000 })

    const filteredUserReport = listUserReport && listUserReport.data && listUserReport.data.filter(report => report.content && removeVietnameseTones(report.content).includes(removeVietnameseTones(searchTerm)))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(filteredUserReport ? filteredUserReport.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filteredUserReport && filteredUserReport.length > 0 ? filteredUserReport.slice(startIndex, endIndex) : []

    if (user && user.role && user.role.toLowerCase() === "admin") {
        return (
            <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                Bạn không đủ quyền hạn!!!
            </div>
        )
    }

    return (
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
                    transition-all
                    duration-500
                "
            >
                <div className="flex flex-col gap-3">
                    <h1 className="font-semibold md:text-4xl text-3xl flex-shrink-0">
                        Quản lý báo cáo
                    </h1>
                    <div className="relative flex flex-row gap-3">
                        {options.map((item) => (
                            <button
                                className={`cursor-pointer flex-shrink-0 whitespace-nowrap text-lg px-4 py-1 rounded-lg font-semibold border border-primary-blue-cus ${selectOption.value === item.value ? "bg-primary-blue-cus text-white" : "bg-white text-primary-blue-cus"}`}
                                key={item.value}
                                onClick={() => setSelectOption(item)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
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
            ) : !listUserReport || !filteredUserReport || listUserReport.data.length === 0 ? (
                <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                    Không có đơn tố cáo nào tồn tại
                </div>
            ) : error ? (
                <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                    Lỗi API
                </div>
            ) : filteredUserReport && filteredUserReport.length === 0 ? (
                <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
                    Đơn tố cáo này không tồn tại
                </div>
            ) : (
                <>
                    <TableUserReport listItem={visibleItems} selected={selectOption.value.toString()} currentPage={currentPage} itemsPerPage={itemsPerPage} />
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
    )
}

export default UserReportManagement