"use client"

import { useRechargeModal } from "@/hooks"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { WalletFromRecharge } from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import { walletRechargeSchema } from "@/utils"
import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "@/contexts"
import { VNPAYService } from "@/services"
import { toast } from "react-toastify"
import { mutate } from "swr"
import { LoadingActionWallet } from "../../loader"
import CustomModal from "../Modal"
import { Button, Input } from "../../form"

const ModalRecharge = () => {
    const rechargeModal = useRechargeModal()
    const { user, setIsLoadingModal, isLoadingModal, setFetchUser } = useContext(GlobalContext) || {}
    const newWindowRef = useRef<any>(null)
    const [windowOpened, setWindowOpened] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<WalletFromRecharge>({
        resolver: yupResolver(walletRechargeSchema)
    })

    const onSubmit = async (data: WalletFromRecharge) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id) {
            const res = await VNPAYService({
                id: user.id,
                money: data.money
            })

            //console.log(res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            let windowWidth = 600;
            let windowHeight = 800;
            let yPosition = window.outerHeight / 2 - windowHeight / 2 + window.screenY;
            let xPosition = window.outerWidth / 2 - windowWidth / 2 + window.screenX;

            newWindowRef.current = window.open(res.data.uri, "NewWindow", `height=${windowHeight}, width=${windowWidth}, top=${yPosition}, left=${xPosition}`)
            setWindowOpened(true)

            rechargeModal.onClose()
            reset()
        }
    }

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data === 'payment completed') {
                if (setFetchUser) setFetchUser(true)
                if (user) mutate(`/api/wallet/${user.id}/user_wallet`)
                if (setIsLoadingModal) setIsLoadingModal(false)
            }
        }

        window.addEventListener('message', handleMessage)

        return () => {
            window.removeEventListener('message', handleMessage)
        }
    }, [setIsLoadingModal, setFetchUser, user])

    useEffect(() => {
        let checkWindowClosed: NodeJS.Timeout;

        if (windowOpened) {
            checkWindowClosed = setInterval(function () {
                if (newWindowRef.current && newWindowRef.current.closed) {
                    clearInterval(checkWindowClosed)
                    if (setIsLoadingModal) setIsLoadingModal(false)
                    setWindowOpened(false)
                }
            }, 1000)
        }

        return () => {
            if (checkWindowClosed) {
                clearInterval(checkWindowClosed);
            }
        }
    }, [setIsLoadingModal, windowOpened])

    if (isLoadingModal) {
        return <LoadingActionWallet loading={isLoadingModal} />
    }

    return (
        <CustomModal
            isOpen={rechargeModal.isOpen}
            onClose={rechargeModal.onClose}
            title="Nhập chi tiết giao dịch"
            width="w-full lg:w-2/4 md:3/4 max-w-full"
            height="h-auto"
        >
            <form className="relative flex flex-col justify-center items-center gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center space-x-5">
                    <div className="relative flex-shrink-0">
                        <Image
                            src="/images/VNPAY.png"
                            alt="VNPAY"
                            height={100}
                            width={100}
                            className="object-contain w-16 h-12"
                        />
                    </div>
                    <div className="text-2xl font-semibold text-gray-600">
                        Thanh toán Vnpay
                    </div>
                </div>
                <div className="relative flex flex-col gap-3 w-full px-2 md:px-10">
                    <label className="text-gray-600 text-xl font-semibold text-left">
                        Nhập số tiền cần nạp:
                    </label>
                    <Input
                        isMoney
                        colorInput="w-full bg-[#F5F5F5] text-gray-600 text-xl"
                        id="money"
                        type="number"
                        register={register}
                        name="money"
                        errors={errors}
                    />
                    <div className="relative flex self-end">
                        <Button
                            title="Đồng ý"
                            style="py-3 px-12"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalRecharge