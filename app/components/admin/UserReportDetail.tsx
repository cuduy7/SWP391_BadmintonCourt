"use client"

import { UserReportDetailData } from "@/types"
import { useRouter } from "next/router"
import { IoMdArrowRoundBack } from "react-icons/io"
import { Button, ModalAdminBan, ModalAdminDeletePost, ModalSendNoticeUser } from "../providers"
import Image from "next/image"
import { formatMoney, isValidUrl } from "@/utils"
import Decimal from "decimal.js"
import { useAdminBanModal, useAdminDeletePostModal, useChangeMoneyToModal, useSendNoticePostModal, useSendNoticeUserModal, useTrackingReportModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import Link from "next/link"

const UserReportDetail: React.FC<UserReportDetailData> = ({
    data
}) => {
    const options = [
        { value: 0, label: 'Báo cáo bài đăng' },
        { value: 1, label: 'Báo cáo hóa đơn' },
        { value: 2, label: 'Báo cáo người dùng' }
    ]

    const adminDeletePostModal = useAdminDeletePostModal()
    const sendNoticePostModal = useSendNoticePostModal()
    const sendNoticeModal = useSendNoticeUserModal()
    const trackingReportModal = useTrackingReportModal()
    const changeToModal = useChangeMoneyToModal()
    const adminBanModal = useAdminBanModal()

    const { user } = useContext(GlobalContext) || {}

    const router = useRouter()

    const res = data

    const reportTitle = options.find(data => data.value === res?.reportType)
    const resTypePost = res?.reportType === 0
    const resTypeTran = res?.reportType === 1

    return (
        <div className="relative flex flex-col px-6 py-10 gap-5">
            <ModalAdminDeletePost user_id={res && res.userSendId ? res.userSendId : ""} />
            <ModalSendNoticeUser user_id={res && res.userSendId ? res.userSendId : ""} />
            <ModalAdminBan user_id={res && res.userSendId ? res.userSendId : ""} />
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
                    Chi tiết báo cáo
                </h1>
            </div>
            <section className="flex flex-col gap-5 text-gray-600 text-xl md:px-3">
                <div className="space-x-3">
                    <span className="font-medium">
                        Tình trạng:
                    </span>
                    <span className="font-semibold">
                        {res?.reportStatus !== 0 ? "Đã xử lý" : "Chưa xử lý"}
                    </span>
                </div>
                <div className="space-x-3">
                    <span className="font-medium">
                        Người bị báo cáo:
                    </span>
                    <span className="font-semibold">
                        {res?.sendUserName ?? "Chưa có"}
                    </span>
                </div>
                <div className="space-x-3">
                    <span className="font-medium">
                        Dạng báo cáo:
                    </span>
                    <span className="font-semibold">
                        {reportTitle?.label ?? "Chưa có"}
                    </span>
                </div>
                <div className="space-x-3">
                    <span className="font-medium">
                        Lỗi báo cáo:
                    </span>
                    <span className="font-semibold">
                        {res?.titleReport ?? "Chưa có"}
                    </span>
                </div>
                <div className="space-x-3">
                    <span className="font-medium">
                        Nội dung:
                    </span>
                    <span className="font-semibold">
                        {res?.contentReport ?? "Chưa có"}
                    </span>
                </div>
                <div className="space-x-3">
                    <span className="font-medium">
                        Người thực hiện báo cáo:
                    </span>
                    <span className="font-semibold">
                        {res?.reportUserName ?? "Chưa có"}
                    </span>
                </div>
            </section>
            {(resTypePost || resTypeTran) && (
                <div className="border-b border-black border-opacity-10" />
            )}
            {resTypePost ? (
                <div className="flex flex-col gap-5  md:px-3">
                    <h2 className="text-gray-600 font-semibold text-2xl">
                        Bài đăng bị báo cáo
                    </h2>
                    <Link href={`/product/detail-product/${res.reportPost?.postId}`} className="relative md:grid md:grid-cols-5 flex flex-col gap-3 border border-black border-opacity-10 rounded-lg transition-all duration-500">
                        <div className="col-span-2 relative md:h-full h-60 sm:h-80 w-full transition-all duration-500">
                            {res.reportPost?.postImage && isValidUrl(res.reportPost?.postImage) ? (
                                <Image
                                    src={res.reportPost.postImage}
                                    alt="report post"
                                    sizes="(max-width: 600px) 100vw, 600px"
                                    fill
                                    className="object-fill"
                                    placeholder="blur"
                                    blurDataURL={res.reportPost.postImage}
                                />
                            ) : (
                                <Image
                                    src="/images/item_1.jpg"
                                    alt="report post"
                                    sizes="(max-width: 600px) 100vw, 600px"
                                    fill
                                    className="object-fill"
                                    placeholder="blur"
                                />
                            )}
                        </div>
                        <div className="col-span-3">
                            <section className="flex flex-col text-xl text-gray-600 py-3 px-2 gap-3 md:h-96 justify-around">
                                <h1 className="text-2xl font-semibold">
                                    {res.reportPost?.postName ?? "Chưa có"}
                                </h1>
                                <p className="line-clamp-3 h-[5rem]">
                                    {res.reportPost?.postContent ?? "Chưa có"}
                                </p>
                                <div className="space-x-1">
                                    <span className="text-gray-500">
                                        Ngày đăng:
                                    </span>
                                    <span className="font-semibold">
                                        {res.reportPost?.postDate ?? "Chưa có"}
                                    </span>
                                </div>
                                <div className="space-x-1">
                                    <span className="text-gray-500">
                                        Địa chỉ sân:
                                    </span>
                                    <span className="font-semibold">
                                        {res.reportPost?.postAddress ?? "Chưa có"}
                                    </span>
                                </div>
                            </section>
                        </div>
                    </Link>
                </div>
            ) : resTypeTran && (
                <div className="flex flex-col gap-5 md:px-3">
                    <h2 className="text-gray-600 font-semibold text-2xl">
                        Hóa đơn bị báo cáo
                    </h2>
                    <Link href={`/transaction/detail-transaction/${res.reportTrans?.transId}`} className="relative flex flex-col gap-3 border border-black border-opacity-10 rounded-lg px-3 py-3">
                        <div className="space-x-1">
                            <span className="text-gray-500">
                                Mã đơn hàng:
                            </span>
                            <span className="font-semibold">
                                {res.reportTrans?.transId ?? "Chưa có"}
                            </span>
                        </div>
                        <div className="space-x-1">
                            <span className="text-gray-500">
                                Ngày đặt hàng:
                            </span>
                            <span className="font-semibold">
                                {res.reportTrans?.transDate ?? "Chưa có"}
                            </span>
                        </div>
                        <div className="space-x-1">
                            <span className="text-gray-500">
                                Giá tiền:
                            </span>
                            <span className="font-semibold">
                                {formatMoney(new Decimal(res.reportTrans?.transMoney ?? 0))}
                            </span>
                        </div>
                    </Link>
                </div>
            )}
            <div className="border-b border-black border-opacity-10" />
            {res?.reportStatus !== 2 && (
                <div className="flex flex-col gap-5 md:px-3">
                    <h2 className="text-gray-600 font-semibold text-2xl">
                        Lựa chọn xử lý
                    </h2>
                    {resTypePost ? (
                        <div className="relative flex gap-3">
                            <Button
                                title="Gửi nhắc nhở"
                                color="bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700"
                                style="py-1 px-4"
                                onClick={() => {
                                    if (res.reportPost?.postId && res.reportId)
                                        sendNoticePostModal.onOpen(res.reportPost.postId, res.reportId)
                                }}
                            />
                            <Button
                                title="Xóa bài"
                                color="bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700"
                                style="py-1 px-4"
                                onClick={() => {
                                    if (res.reportPost?.postId && res.reportId)
                                        adminDeletePostModal.onOpen(res.reportPost.postId, res.reportId)
                                }}
                            />
                        </div>
                    ) : resTypeTran ? (
                        <div className="relative flex gap-3">
                            <Button
                                title="Nhắn tin"
                                color="bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700"
                                style="py-1 px-4"
                                onClick={() => {
                                    if (user && user.id && res.reportId)
                                        trackingReportModal.onOpen(user.id, res.reportId)
                                }}
                            />
                            <Button
                                title="Chuyển tiền (chủ sân)"
                                color="bg-emerald-500 hover:bg-emerald-700 border-emerald-500 hover:border-emerald-700"
                                style="py-1 px-4"
                                onClick={() => {
                                    if (res.userReportId && res.reportTrans && res.reportTrans.transMoney && res.reportId && res.reportTrans.transId)
                                        changeToModal.onOpen(res.userReportId, res.reportTrans.transMoney, "chủ sân", res.reportId, res.reportTrans.transId)
                                }}
                            />
                            <Button
                                title="Chuyển tiền (người đặt)"
                                color="bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700"
                                style="py-1 px-4"
                                onClick={() => {
                                    if (res.userSendId && res.reportTrans && res.reportTrans.transMoney && res.reportId && res.reportTrans.transId)
                                        changeToModal.onOpen(res.userSendId, res.reportTrans.transMoney, "người đặt sân", res.reportId, res.reportTrans.transId)
                                }}
                            />
                        </div>
                    ) : (
                        <div className="relative flex gap-3">
                            <Button
                                title="Gửi nhắc nhở"
                                color="bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700"
                                style="py-1 px-4"
                                onClick={() => {
                                    if (res.reportId)
                                        sendNoticeModal.onOpen(res.reportId)
                                }}
                            />
                            {!res.isBan && (
                                <Button
                                    title="Khóa tài khoản"
                                    color="bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700"
                                    style="py-1 px-4"
                                    onClick={() => {
                                        if (res.reportId)
                                            adminBanModal.onOpen(res.reportId)
                                    }}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default UserReportDetail