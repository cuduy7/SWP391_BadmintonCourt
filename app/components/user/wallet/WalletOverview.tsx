"use client"

import { GlobalContext } from "@/contexts"
import { useRechargeModal, useWithdrawModal } from "@/hooks"
import { AxiosClient } from "@/services"
import { WalletUserData } from "@/types"
import { formatMoney } from "@/utils"
import Decimal from "decimal.js"
import Image from "next/image"
import { useContext } from "react"
import useSWR from "swr"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const WalletOverview = () => {
    const { user } = useContext(GlobalContext) || {}
    const withdrawModal = useWithdrawModal()
    const rechargeModal = useRechargeModal()
    // const featuringModal = useFeaturingModal()

    const { data: userWallet } = useSWR<WalletUserData>(user ? `/api/wallet/${user.id}/user_wallet` : null, fetcher, { refreshInterval: 5000 })

    const handleWithdrawModal = () => {
        withdrawModal.onOpen()
        // featuringModal.onOpen()
    }

    const handleRechargeModal = () => {
        rechargeModal.onOpen()
    }

    return (
        <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center py-10 px-5 w-full md:bg-[#F5F5F5] md:border md:border-black md:border-opacity-10 md:rounded-lg">
            <div className="flex space-x-4">
                <div className="relative flex-shrink-0 h-full">
                    <Image
                        src="/images/walletIcon.png"
                        alt="walletIcon"
                        width={200}
                        height={100}
                        className="object-contain w-20 h-full"
                    />
                </div>
                <section className="flex flex-col gap-3">
                    <label className="font-semibold text-2xl">
                        Số dư ví
                    </label>
                    <p className="font-semibold text-3xl ease-in-out transition-all duration-500">
                        {formatMoney(new Decimal(userWallet ? userWallet.data.balance : 0))}
                    </p>
                </section>
            </div>
            <div className="flex space-x-3 h-full md:py-0 md:px-0 p-5 md:bg-white md:border-none bg-[#F5F5F5] border border-black border-opacity-10 md:rounded-none rounded-lg">
                <button className="flex flex-col h-full w-36 py-2 items-center justify-center bg-primary-blue-cus text-white rounded-lg" type="button" onClick={handleRechargeModal}>
                    <div className="relative flex-shrink-0">
                        <Image
                            src="/images/withdraw.png"
                            alt="withdraw"
                            height={60}
                            width={60}
                            className="object-cover h-12 w-12"
                        />
                    </div>
                    <div className="font-semibold text-lg">
                        Nạp tiền
                    </div>
                </button>
                <button className="flex flex-col h-full w-36 py-2 items-center justify-center bg-primary-blue-cus text-white rounded-lg" type="button" onClick={handleWithdrawModal}>
                    <div className="relative flex-shrink-0">
                        <Image
                            src="/images/recharge.png"
                            alt="withdraw"
                            height={60}
                            width={60}
                            className="object-cover h-12 w-12"
                        />
                    </div>
                    <div className="font-semibold text-lg">
                        Rút tiền
                    </div>
                </button>
            </div>
        </div>
    )
}

export default WalletOverview