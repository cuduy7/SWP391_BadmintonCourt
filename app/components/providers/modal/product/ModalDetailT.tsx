"use client"

import { LoadingFullScreen } from "../../loader"
import CustomModal from "../Modal"
import { AxiosClient } from "@/services"
import { TransactionPaymentDetail } from "@/types"
import useSWR from "swr"
import Image from "next/image"
import { useDetailTModal } from "@/hooks/useProduct"
import { TransactionDetail, TransactionExtra } from "@/app/components/transaction"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const ModalDetailT = () => {
    const detailTModal = useDetailTModal()
    const transactionId = detailTModal.transactionId

    const { data: listItem, error, isLoading } = useSWR<TransactionPaymentDetail>(`/api/transactions/${transactionId}/detail`, fetcher)

    return (
        <CustomModal
            isOpen={detailTModal.isOpen}
            onClose={detailTModal.onClose}
            width="md:w-[90%] w-full"
            height="h-fit"
        >
            <form className="flex flex-col pb-5 gap-3">
                <label className="text-gray-600 font-semibold text-3xl">Chi tiết giao dịch</label>
                {isLoading ? (
                    <LoadingFullScreen loading={isLoading} />
                ) : error ? (
                    <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                        <p className="md:text-4xl text-3xl font-semibold">Đã xảy ra lỗi khi tải hóa đơn - error 500</p>
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
                ) : !listItem ? (
                    <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                        <p className="md:text-4xl text-3xl font-semibold">Không tìm thấy giao dịch</p>
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
                ) : (
                    <div className="md:grid md:grid-cols-12 flex flex-col gap-3 text-gray-600 text-left p-4">
                        <TransactionDetail
                            id={transactionId ?? "1"}
                            slotCount={listItem.data.slotCount}
                            slots={listItem.data.slots}
                            buyerName={listItem.data.buyerName}
                            payTime={listItem.data.payTime}
                            post={listItem.data.post}
                            cancelHour={listItem.data.cancelHour}
                        />
                        <TransactionExtra
                            id={transactionId ?? "1"}
                            total={listItem.data.total}
                            isCancel={false}
                            tranStatus={2}
                        />
                    </div>
                )}
            </form>
        </CustomModal>
    )
}

export default ModalDetailT