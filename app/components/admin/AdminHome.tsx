"use client"

import { useContext, useEffect, useState } from "react"
import { Button, DownMetalBtn, Input, Loading, LoadingActionWallet, LoadingFadeSmall, LoadingFullScreen, Search } from "../providers"
import { AxiosClient, updateRequestAcceptService, updateRequestDeniedService, updateSettingAdminService } from "@/services"
import useSWR from "swr";
import { GlobalContext, SettingNames } from "@/contexts"
import { AdminSetting, AdminSettingListData, HistoryTransaction, HistoryTransactionData, ListProduct, ListRequestWithdraw, ManageUser, ManagementReport, WalletUserData } from "@/types";
import { Status, formatMoney } from "@/utils"
import ReactPaginate from "react-paginate"
import * as XLSX from 'xlsx'
import Decimal from "decimal.js"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { IoWalletOutline } from "react-icons/io5";
import { addDays, format } from "date-fns"
import { GiReceiveMoney } from "react-icons/gi"
import { FaUserFriends } from "react-icons/fa";
import { BsBookmarksFill } from "react-icons/bs";

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

const listTitleSetting = [
    { settingName: SettingNames.PostingFee, label: "Phí đăng bài (VND)", isMoney: true },
    { settingName: SettingNames.BookingFee, label: "Phí hoa hồng (% theo giao dịch)" },
    { settingName: SettingNames.FreeNumberPost, label: "Lượt miễn phí đăng bài/tháng" },
    { settingName: SettingNames.BoostPostFree, label: "Phí đẩy bài", isMoney: true },
    { settingName: SettingNames.CancelHour, label: "Thời gian hủy bài (giờ)" },
]

const exportToExcel = (listItem: HistoryTransactionData[]) => {
    const headers = listTitleHistoryWallet.slice(1, 5).map(item => item.title)

    const data = listItem.map(item => [
        item.time,
        item.type,
        item.status,
        item.amount
    ])

    data.unshift(headers)

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1")

    XLSX.writeFile(workbook, "Quản lý lịch sử giao dịch.xlsx")
}

const TableHistoryWallet: React.FC<TableHistoryWalletProps> = ({ listItem, currentPage, itemsPerPage }) => {
    const startIndex = currentPage * itemsPerPage

    return (
        <table className="table-auto border-separate border border-black text-gray-600 border-opacity-10 rounded-2xl text-sm sm:text-lg md:text-xl text-center">
            <thead>
                <tr>
                    {listTitleHistoryWallet.map((item, index) => (
                        <th className={`
                                font-semibold 
                                py-3 
                                md:whitespace-nowrap
                                px-1
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

const AdminHome = () => {
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [disable, setDisable] = useState<boolean>(true)
    const [dateRange, setDateRange] = useState({
        startDate: format(new Date(), 'MM/dd/yyyy'),
        endDate: format(addDays(new Date(), 1), 'MM/dd/yyyy')
    })
    const [displayCount, setDisplayCount] = useState(5)

    const { user, isLoadingModal, setIsLoadingModal, isLoading, setIsLoading } = useContext(GlobalContext) || {}

    const { data: listHistoryWallet, error, isLoading: loadingHistory } = useSWR<HistoryTransaction>(user ? `/api/wallet/user/${user.id}/history` : null, fetcher, { refreshInterval: 10000 })
    const { data: listSetting, mutate } = useSWR<AdminSetting>(`/api/Settings/get_listSetting`, fetcher, { refreshInterval: 10000 })
    const { data: userWallet, isLoading: loadingWallet } = useSWR<WalletUserData>(user ? `/api/wallet/${user.id}/user_wallet` : null, fetcher, { refreshInterval: 5000 })
    const { data: listIncoming, isLoading: loadingIncoming } = useSWR<ManagementReport>(dateRange.endDate && dateRange.startDate ? `/api/users/${encodeURIComponent(dateRange.startDate)}&${encodeURIComponent(dateRange.endDate)}/report_income_Month` : null, fetcher, { refreshInterval: 10000 })
    const { data: listUser, isLoading: loadingUser } = useSWR<ManageUser>(user ? `/api/users/managed/${user.id}` : null, fetcher, { refreshInterval: 10000 })
    const { data: listProduct, isLoading: loadingProduct } = useSWR<ListProduct>(`/api/posts/GetListPost`, fetcher, { refreshInterval: 10000 })
    const { data: listRequest, isLoading: loadingRequest, mutate: reLoadRequest } = useSWR<ListRequestWithdraw>(`/api/transactions/withdraw_request`, fetcher, { refreshInterval: 10000 })

    const { register, handleSubmit, setValue, watch } = useForm<AdminSettingListData>({
        defaultValues: {
            listSettingData: listSetting?.data,
        }
    })

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 5);
    }

    useEffect(() => {
        if (listSetting && listSetting.data.length > 0) {
            setValue("listSettingData", listSetting.data)
        }
    }, [listSetting, setValue])

    const onSubmit = async (data: AdminSettingListData) => {
        if (setIsLoadingModal) setIsLoadingModal(true);

        const dataAll = watch();

        for (const [settingName, settingValue] of Object.entries(dataAll)) {
            const setting = data.listSettingData.find(item => item.settingName === settingName);

            // Kiểm tra nếu settingValue không phải undefined và setting tồn tại
            if (settingValue !== undefined && setting) {
                if (settingName === SettingNames.PostingFee && (settingValue < 0 || settingValue > 1000000)) {
                    toast.error("Phí đăng bài phải từ 0-1.000.000 VNĐ", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (setIsLoadingModal) setIsLoadingModal(false);
                    return;
                }

                if (settingName === SettingNames.BookingFee && (settingValue < 0 || settingValue > 100)) {
                    toast.error("Phí hoa hồng phải từ 0%-100%", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (setIsLoadingModal) setIsLoadingModal(false);
                    return;
                }

                if (settingName === SettingNames.FreeNumberPost && (settingValue < 0 || settingValue > 10)) {
                    toast.error("Lượt miễn phí từ 0-10 lượt/tháng", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (setIsLoadingModal) setIsLoadingModal(false);
                    return;
                }

                if (settingName === SettingNames.BoostPostFree && (settingValue < 0 || settingValue > 1000000)) {
                    toast.error("Phí đẩy bài phải từ 0-1.000.000 VNĐ", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (setIsLoadingModal) setIsLoadingModal(false);
                    return;
                }

                if (settingName === SettingNames.CancelHour && (settingValue < 0)) {
                    toast.error("Thời gian hủy hóa đơn không thể âm", {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    if (setIsLoadingModal) setIsLoadingModal(false);
                    return;
                }

                // console.log(setting.settingId, settingValue)

                const res = await updateSettingAdminService({
                    SettingId: setting.settingId,
                    SettingAmount: settingValue
                });

                // console.log(res);

                if (res.data === null) {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    });
                    return;
                }
            }
        }

        toast.success("Cập nhật thành công", {
            position: toast.POSITION.TOP_RIGHT
        });

        mutate();
        setDisable(true)

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    const handleAcceptRequest = async (id_request: string) => {
        if (setIsLoading) setIsLoading(true)

        const res = await updateRequestAcceptService(id_request)

        if (res.data === null) {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        toast.success("Cập nhật thành công", {
            position: toast.POSITION.TOP_RIGHT
        })

        reLoadRequest()

        if (setIsLoading) setIsLoading(false)
    }

    const handleDeniedRequest = async (id_request: string) => {
        if (setIsLoading) setIsLoading(true)

        const res = await updateRequestDeniedService(id_request)

        if (res.data === null) {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            })
            if (setIsLoading) setIsLoading(false)
            return
        }

        toast.success("Cập nhật thành công", {
            position: toast.POSITION.TOP_RIGHT
        })

        reLoadRequest()

        if (setIsLoading) setIsLoading(false)
    }

    const filterHistoryWallet = listHistoryWallet && listHistoryWallet.data && listHistoryWallet.data.filter(history => history.time && history.time.trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))

    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 8
    const pageCount = Math.ceil(filterHistoryWallet ? filterHistoryWallet.length / itemsPerPage : 0)

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected)
    }

    const startIndex = currentPage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleItems = filterHistoryWallet && filterHistoryWallet.length > 0 ? filterHistoryWallet.slice(startIndex, endIndex) : []

    // if (user && user.role && user.role.toLowerCase() === "staff") {
    //     return (
    //         <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-screen">
    //             Bạn không đủ quyền hạn!!!
    //         </div>
    //     )
    // }

    if (isLoading) {
        return <LoadingActionWallet loading={isLoading} />
    }

    return (
        <div className="relative flex flex-col px-6 py-10 gap-10">
            <div className="flex md:flex-row flex-col gap-5 justify-between items-start transition-all duration-500">
                <div className="
                        flex 
                        flex-col 
                        text-gray-600 
                        gap-5
                        md:flex-row 
                        md:justify-between 
                        md:items-center 
                        md:gap-0
                    "
                >
                    <h1 className="font-semibold md:text-4xl text-3xl flex-shrink-0">
                        Quản lý chung
                    </h1>
                </div>
            </div>
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                <div className="col-span-1 border border-black border-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="flex xl:flex-row flex-col gap-5 py-3 px-5 items-center justify-around">
                        <div className="relative text-primary-blue-cus flex-shrink-0">
                            <IoWalletOutline size={60} />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            {loadingWallet ? (
                                <div className="relative w-full h-full justify-center items-center">
                                    <LoadingFadeSmall loading={loadingWallet} />
                                </div>
                            ) : (
                                <>
                                    <div className="text-2xl font-semibold text-primary-blue-cus">
                                        {formatMoney(new Decimal(userWallet?.data.balance ?? 0))}
                                    </div>
                                    <div className="text-xl font-semibold text-gray-600">
                                        Ví tiền
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 border border-black border-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="flex xl:flex-row flex-col gap-5 py-3 px-5 items-center justify-around">
                        <div className="relative text-primary-blue-cus flex-shrink-0">
                            <GiReceiveMoney size={60} />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            {loadingIncoming ? (
                                <div className="relative w-full h-full justify-center items-center">
                                    <LoadingFadeSmall loading={loadingIncoming} />
                                </div>
                            ) : (
                                <>
                                    <div className="text-2xl font-semibold text-primary-blue-cus">
                                        {formatMoney(new Decimal(listIncoming?.data.total ?? 0))}
                                    </div>
                                    <div className="text-xl font-semibold text-gray-600">
                                        Doanh thu theo ngày
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 border border-black border-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="flex xl:flex-row flex-col gap-5 py-3 px-5 items-center justify-around">
                        <div className="relative text-primary-blue-cus flex-shrink-0">
                            <FaUserFriends size={60} />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            {loadingUser ? (
                                <div className="relative w-full h-full justify-center items-center">
                                    <LoadingFadeSmall loading={loadingUser} />
                                </div>
                            ) : (
                                <>
                                    <div className="text-2xl font-semibold text-primary-blue-cus">
                                        {listUser?.data.length ?? 0}
                                    </div>
                                    <div className="text-xl font-semibold text-gray-600">
                                        Người dùng
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 border border-black border-opacity-50 rounded-lg flex items-center justify-center">
                    <div className="flex xl:flex-row flex-col gap-5 py-3 px-5 items-center justify-around">
                        <div className="relative text-primary-blue-cus flex-shrink-0">
                            <BsBookmarksFill size={60} />
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            {loadingProduct ? (
                                <div className="relative w-full h-full justify-center items-center">
                                    <LoadingFadeSmall loading={loadingProduct} />
                                </div>
                            ) : (
                                <>
                                    <div className="text-2xl font-semibold text-primary-blue-cus">
                                        {listProduct?.data.length ?? 0}
                                    </div>
                                    <div className="text-xl font-semibold text-gray-600">
                                        Bài đăng
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
                     
            <div className="
                    flex 
                    flex-col 
                    text-gray-600 
                    gap-5
                    md:flex-row 
                    md:justify-between 
                    md:items-center 
                    md:gap-0
                    pt-5
                "
            >
                <h1 className="font-semibold md:text-3xl text-2xl flex-shrink-0">
                    Quản lý danh thu
                </h1>
                <div className="flex gap-3 flex-col md:flex-row justify-end flex-wrap transition-all duration-500">
                    <DownMetalBtn onClick={() => {
                        if (listHistoryWallet)
                            exportToExcel(listHistoryWallet.data)
                    }} />
                    <div className="flex flex-col space-y-1 md:w-auto w-full transition-all duration-500">
                        <Search value={searchTerm} onChange={setSearchTerm} style="w-full" />
                    </div>
                </div>
            </div>
            {
                loadingHistory ? (
                    <div className="h-96 flex items-center justify-center">
                        <LoadingFullScreen loading={loadingHistory} />
                    </div>
                ) : !listHistoryWallet || !filterHistoryWallet || listHistoryWallet.data.length === 0 ? (
                    <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-96">
                        Không có lịch sử giao dịch!
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-96">
                        Lỗi API
                    </div>
                ) : filterHistoryWallet && filterHistoryWallet.length === 0 ? (
                    <div className="flex items-center justify-center md:text-4xl text-3xl text-primary-blue-cus font-semibold h-96">
                        Giao dịch này không tồn tại!
                    </div>
                ) : (
                    <>
                        <TableHistoryWallet listItem={visibleItems} currentPage={currentPage} itemsPerPage={itemsPerPage} />
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
                )
            }
        </div >
    )
}

export default AdminHome