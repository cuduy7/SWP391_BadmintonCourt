import { formatMoney } from "@/utils"
import Decimal from "decimal.js"
import Image from "next/image"
import { Button } from "../../providers"
import { TransactionPaymentDetailData } from "@/types"
import { useDeleteTransactionModal, useTransactionModal } from "@/hooks"

const TransactionExtra: React.FC<TransactionPaymentDetailData> = ({
    id,
    total,
    isCancel,
    tranStatus
}) => {
    const deleteTransactionModal = useDeleteTransactionModal()

    const transactionModal = useTransactionModal()

    console.log(tranStatus)

    return (
        <div className="col-span-4 gap-5 flex flex-col">
            {/* <div className="flex flex-col gap-5 rounded-lg bg-[#F5F5F5] p-6 text-gray-600">
                <label className="text-2xl font-semibold ">
                    Voucher đã áp dụng
                </label>
                <p className="text-lg font-medium">
                    KM100K
                </p>
            </div> */}
            <div className="flex flex-col gap-5 rounded-lg bg-[#F5F5F5] p-6 text-gray-600">
                <label className="text-2xl font-semibold ">
                    Số tiền cần thanh toán
                </label>
                <div className="text-3xl font-semibold">
                    {formatMoney(new Decimal(total ?? 0))}
                </div>
            </div>
            {/* <div className="flex flex-col gap-5 rounded-lg bg-[#F5F5F5] p-6 text-gray-600">
                <label className="text-2xl font-semibold ">
                    Phương thức đã thanh toán
                </label>
                <div className="flex flex-row gap-3">
                    <div className="relative flex-shrink-0">
                        <Image
                            src="/images/walletIcon.png"
                            alt="payment"
                            height={60}
                            width={60}
                            className="object-contain w-20 h-16"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-xl text-gray-600 font-semibold">
                            Ví VBM
                        </div>
                        <div className="text-xl text-gray-500 font-normal">
                            ******
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="relative flex justify-center">
                {isCancel ? (
                    <Button
                        title="Hủy chỗ đặt"
                        style="py-3 text-lg"
                        onClick={() => {
                            if (id)
                                deleteTransactionModal.onOpen(id)
                        }}
                    />
                ) : (
                    (tranStatus === 0 || tranStatus === 1) && (
                        <Button
                            title="Thanh toán ngay"
                            style="py-3 text-lg"
                            onClick={transactionModal.onOpen}
                        />
                    )
                )}
            </div>
        </div>
    )
}

export default TransactionExtra