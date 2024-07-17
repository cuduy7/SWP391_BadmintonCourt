"use client"

import { usePolicyModal } from "@/hooks"
import CustomModal from "./Modal"
import { Button } from "../form"
import { listContentPolicy, listOverviewPolicy } from "@/utils"
import { useContext, useState } from "react"
import { updatePolicyService } from "@/services"
import { toast } from "react-toastify"
import { GlobalContext } from "@/contexts"

const ModalPolicy = () => {
    const [check, setCheck] = useState<boolean>(false)
    const { setFetchUser } = useContext(GlobalContext) || {}

    const policyModal = usePolicyModal()

    const user_id = policyModal.user_id

    const handleClick = async () => {
        if (user_id) {
            const res = await updatePolicyService(user_id)

            if (res.data === null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                policyModal.onClose()
                return
            }

            toast.success("Cập nhật thành công", {
                position: toast.POSITION.TOP_RIGHT
            })

            if (setFetchUser) setFetchUser(true)
            policyModal.onClose()
        }
    }

    return (
        <CustomModal
            isOpen={policyModal.isOpen}
            onClose={policyModal.onClose}
            width="md:w-[80%] w-full"
            height="h-[95%]"
        >
            <div className="flex flex-col md:px-10 pb-5 gap-3 justify-center items-center h-full relative">
                <label className="text-black font-semibold text-3xl truncate">Các điều khoản</label>
                <div className="flex flex-col gap-3 text-left h-[45rem] overflow-auto">
                    <div className="flex flex-col gap-3 text-xl text-gray-500 font-medium">
                        <div className="text-gray-600 font-semibold text-2xl">
                            Tổng quan
                        </div>
                        {listOverviewPolicy.map((item, index) => (
                            <div key={index} className="pl-4">
                                - {item.content}
                            </div>
                        ))}
                    </div>
                    {listContentPolicy.map((item, index) => (
                        <div className="flex flex-col gap-3 py-3" key={index}>
                            <div className="text-gray-600 font-semibold text-2xl">
                                {item.id}. {item.label}
                            </div>
                            <div className="text-gray-600 font-medium text-xl">
                                {item.header}
                            </div>
                            {Array.isArray(item.body) ? (
                                item.body.map((sub, idx) => (
                                    <div className="text-gray-500 font-medium text-xl pl-4" key={idx}>
                                        - {sub.subContent}
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-600 font-medium text-xl">
                                    {item.body}
                                </div>
                            )}
                            <div className="text-gray-600 font-medium text-xl">
                                {item.subFinal}
                            </div>
                            <div className="text-gray-600 font-medium text-xl">
                                {item.final} {item.email}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-row w-full items-center justify-between">
                    <div className="flex space-x-1 items-center font-semibold text-lg">
                        <input
                            type="checkbox"
                            checked={check}
                            onChange={() => setCheck(!check)}
                        />
                        <span>
                            Tôi chấp nhận các điều khoản trên
                        </span>
                    </div>
                    <Button
                        title="Đồng ý"
                        style="py-3 px-8"
                        onClick={handleClick}
                        disabled={!check}
                    />
                </div>
            </div>
        </CustomModal>
    )
}

export default ModalPolicy