import { TransactionPaymentDetailData } from "@/types"
import { formatDateFunc } from "@/utils"
import { format, parse } from "date-fns"
import { vi } from "date-fns/locale"

const TransactionDetail: React.FC<TransactionPaymentDetailData> = ({
    id,
    slotCount,
    slots,
    buyerName,
    payTime,
    post,
    cancelHour
}) => {
    const date = payTime && parse(payTime, 'dd/MM/yyyy HH:mm', new Date())
    const formattedDate = date && format(date, 'EEEE, dd MMMM yyyy HH:mm', { locale: vi })

    return (
        <div className="col-span-8">
            <div className="rounded-lg bg-[#F5F5F5] p-6 flex flex-col gap-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-semibold ">
                        Chi tiết đơn hàng
                    </h1>
                    <section className="space-x-3 text-lg">
                        <span className="font-semibold">Mã đơn hàng:</span>
                        <span className="font-medium">{id}</span>
                    </section>
                    <section className="space-x-3 text-lg">
                        <span className="font-semibold">Số lượng đặt hàng:</span>
                        <span className="font-medium">{slotCount}</span>
                    </section>
                    <section className="space-x-3 text-lg">
                        <span className="font-semibold">Người thanh toán:</span>
                        <span className="font-medium">{buyerName}</span>
                    </section>
                    <section className="space-x-3 text-lg">
                        <span className="font-semibold">Thời gian thanh toán:</span>
                        <span className="font-medium">{formattedDate}</span>
                    </section>
                </div>
                <div className="border-b-4 border-solid border-gray-300" />
                <div className="flex flex-col gap-5">
                    <h1 className="text-3xl font-semibold ">
                        Tham gia tập luyện cùng tôi!!!
                    </h1>
                    <section className="space-x-3 text-lg">
                        <span className="font-semibold">Địa chỉ:</span>
                        <span className="font-medium">{post && post.address}</span>
                    </section>
                    <section className="flex flex-col gap-3 text-lg">
                        <label className="font-semibold">Ngày chơi:</label>
                        {post && post.slots.map((post, index) => (
                            <section className="flex flex-row gap-2" key={index}>
                                <span className="font-medium pl-2">- {formatDateFunc(post.dateSlot)}</span>
                                {post.slot.map((slot, idx) => (
                                    <span key={idx}>
                                        - {slot};
                                    </span>
                                ))}
                            </section>
                        ))}
                    </section>
                </div>
            </div>
            <div className="text-lg text-gray-500 font-medium relative pt-5">
                *Lưu ý: {cancelHour} giờ trước ngày chơi đầu tiên của bạn sẽ không được hủy đặt sân
            </div>
        </div>
    )
}

export default TransactionDetail