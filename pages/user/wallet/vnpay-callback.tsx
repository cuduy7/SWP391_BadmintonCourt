"use client"

import { LoadingActionWallet } from "@/app/components";
import { GlobalContext } from "@/contexts";
import { walletService } from "@/services";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function VnPayCallback() {
    const router = useRouter()
    const { user } = useContext(GlobalContext) || {}
    const { vnp_ResponseCode, vnp_TransactionStatus, vnp_Amount } = router.query

    useEffect(() => {
        if (vnp_ResponseCode && vnp_TransactionStatus && vnp_Amount) {
            if (vnp_ResponseCode == "00" && vnp_TransactionStatus == "00") {
                (async () => {
                    if (user && user.id) await walletService({ id: user.id, money: Number(vnp_Amount.toString())/100 })
                    router.push('/user/wallet/wallet-success')
                    window.opener.postMessage('payment completed', '*')
                })();
            } else {
                router.push('/user/wallet/wallet-fail')
                window.opener.postMessage('payment completed', '*')
            }
        }
    }, [router, vnp_ResponseCode, vnp_TransactionStatus, vnp_Amount, user])


    return (
        <div className="h-screen flex items-center justify-center">
            <LoadingActionWallet loading={true} />
        </div>
    )
}
