import { CheckSlotFormData, BuySlotFormData, WalletFrom } from "@/types"
import AxiosClient from "../AxiosInstance"

export const bookingService = async (data: CheckSlotFormData) => {
    // //console.log(data)

    try {
        const response = await AxiosClient.post(`/api/slots/booking`, {
            userId: Number(data.userId),
            postId: Number(data.postId),
            slotsInfo: data.slotsInfo,
            isVnpay: data.isVnpay
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const buySlotService = async (data: BuySlotFormData) => {
    console.log(data)

    try {
        const response = await AxiosClient.post(`/api/transactions/buy_slot`, {
            idPost: Number(data.idPost),
            idUser: data.idUser,
            postSlot: data.postSlot,
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const deleteTransactionService = async (tran_id: string) => {
    try {
        const response = await AxiosClient.delete(`/api/transactions/${tran_id}/discard`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const transactionStatusService = async ({ tran_id, status_info }: { tran_id: string, status_info: number }) => {
    try {
        const response = await AxiosClient.put(`/api/transactions/${tran_id}/status_info/${status_info}`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getTransactionDetailService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/transactions/${id}/detail`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getListTransactionService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/posts/user/${id}/joined`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const sendRequestWithdrawService = async (data: WalletFrom) => {
    // console.log(data)

    try {
        const response = await AxiosClient.put(`/api/transactions/create_withdraw_request`, {
            idUser: Number(data.idUser),
            money: Number(data.money),
            bankName: data.bankName,
            accountName: data.accountName,
            bankNumber: data.bankNumber
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}