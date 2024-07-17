"use client"

import { GlobalContext } from "@/contexts"
import { AxiosClient } from "@/services"
import { HistoryTransaction, HistoryTransactionData } from "@/types"
import { Status, formatMoney } from "@/utils"
import Decimal from "decimal.js"
import { useContext, useState } from "react"
import useSWR from "swr"
import { DownMetalBtn, LoadingFullScreen, Search } from "../../providers"
import ReactPaginate from "react-paginate"
import * as XLSX from 'xlsx'

interface TableHistoryWalletProps {
    listItem: HistoryTransactionData[],
    currentPage: number,
    itemsPerPage: number,
}

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const listTitleHistoryWallet = [
    { title: "#" },
    { title: "Thời gian" },
    { title: "Thao tác" },
    { title: "Trạng thái" },
    { title: "Số tiền" },
]

const exportToExcel = (listItem: HistoryTransactionData[]) => {
    const headers = listTitleHistoryWallet.slice(1,5).map(item => item.title)

    const data = listItem.map(item => [
        item.time,
        item.type,
        item.status,
        formatMoney(new Decimal(item.amount)),
    ])

    data.unshift(headers)

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    XLSX.writeFile(workbook, "Lịch sử giao dịch.xlsx")
}

const TableHistoryWallet: React.FC<TableHistoryWalletProps> = ({ listItem, currentPage, itemsPerPage }) => {
    const startIndex = currentPage * itemsPerPage

    return (
        <table className="table-auto border-separate border border-black border-opacity-10 rounded-2xl text-sm sm:text-lg md:text-xl text-center">
            <thead>
                <tr>
                    {listTitleHistoryWallet.map((item, index) => (
                        <th className={`
                                    font-semibold 
                                    py-3 
                                    ${index < listTitleHistoryWallet.length - 1 ?
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
            <tbody>
                {listItem.map((item, index) => {
                    const statusObject = Status.find(obj => obj.statusEN.toLowerCase() === item.status.toLowerCase())
                    
                    const totalIndex = startIndex + index + 1

                    return (
                        <tr key={index}>
                            <td className="py-2 border-r border-black border-opacity-10">{totalIndex}</td>
                            <td className="py-2 border-r border-black border-opacity-10">{item.time}</td>
                            <td className="py-2 border-r border-black border-opacity-10">{item.type}</td>
                            <td className="py-2 border-r border-black border-opacity-10 font-semibold">
                                {statusObject ? (
                                    item.status.toLowerCase() === "success" ? (
                                        <span className="text-green-500">{statusObject.statusVI}</span>
                                    ) : (
                                        <span className="text-red-500">{statusObject.statusVI}</span>
                                    )
                                ) : (
                                    <span className="text-red-500">Unknown Status</span>
                                )}
                            </td>
                            <td className="py-2 font-semibold text-right px-2">
                                {item.amount.toString().startsWith("-") ? (
                                    <span className="text-red-500">{formatMoney(new Decimal(item.amount))}</span>
                                ) : (
                                    <span className="text-green-500">{formatMoney(new Decimal(item.amount))}</span>
                                )}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const WalletHistory = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const { user } = useContext(GlobalContext) || {}

    const { data: listHistoryWallet, isLoading } = useSWR<HistoryTransaction>(user && user.id ? `/api/wallet/user/${user.id}/history` : null, fetcher, { refreshInterval: 1000 })

    const filterHistoryWallet = listHistoryWallet && listHistoryWallet.data && listHistoryWallet.data.filter(history => history.time && history.time.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 10
    const pageCount = Math.ceil(filterHistoryWallet ? filterHistoryWallet.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filterHistoryWallet && filterHistoryWallet.length > 0 ? filterHistoryWallet.slice(startIndex, endIndex) : []

    return (
        <div className="flex flex-col gap-5 text-gray-600">
            <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between gap-3 transition-all duration-500">
                <div className="font-semibold md:text-4xl text-3xl flex-shrink-0">
                    Lịch sử giao dịch
                </div>
                <div className="flex gap-3 flex-col md:flex-row justify-between transition-all duration-500">
                    <DownMetalBtn onClick={() => {
                        if (listHistoryWallet)
                            exportToExcel(listHistoryWallet.data)
                    }} />
                    <div className="flex flex-col space-y-1 md:w-auto w-full transition-all duration-500">
                        <Search value={searchTerm} onChange={setSearchTerm} style="w-full" />
                    </div>
                </div>
            </div>
            {isLoading ? (
                <LoadingFullScreen loading={isLoading} />
            ) : !listHistoryWallet || !filterHistoryWallet || listHistoryWallet.data.length === 0 ? (
                <div className="flex items-center justify-center text-primary-blue-cus h-96 md:text-4xl text-3xl font-semibold text-center">
                    Bạn chưa thực hiện giao dịch nào cả!
                </div>
            ) : filterHistoryWallet && filterHistoryWallet.length === 0 ? (
                <div className="flex items-center justify-center h-96 text-primary-blue-cus md:text-4xl text-3xl font-semibold text-center">
                    Bạn chưa thực hiện giao dịch nào cả!
                </div>
            ) : (
                <>
                    <TableHistoryWallet listItem={visibleItems} currentPage={currentPage} itemsPerPage={itemsPerPage}/>
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

export default WalletHistory