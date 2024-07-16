export interface TransactionPaymentDetail {
    message: string
    data: {
        id: string
        slotCount: number
        slots:
        {
            id: string
            playDate: string
        }[]
        tranStatus: number
        buyerName: string
        payTime: string
        total: string
        isCancel: boolean
        cancelHour?: string
        post: {
            id: string
            userId: string
            title: string
            titleImage: string
            imageUrls: string[]
            pricePerSlot: string
            address: string
            startTime: string
            endTime: string
            createUser: string
            categorySlot: string
            slots: {
                dateSlot: string
                slot: string[]
                pricePerSlot: number
            }[];
        }
    }
}

export interface TransactionPaymentDetailData {
    id?: string
    slotCount?: number
    slots?: {
        id: string
        playDate: string
    }[]
    tranStatus?: number
    buyerName?: string
    payTime?: string
    total?: string
    isCancel?: boolean
    cancelHour?: string
    post?: {
        id: string
        title: string
        titleImage: string
        imageUrls: string[]
        pricePerSlot: string
        address: string
        startTime: string
        endTime: string
        createUser: string
        categorySlot: string
        slots: {
            dateSlot: string
            slot: string[]
            pricePerSlot: number
        }[];
    }
}

export interface ListTransaction {
    message: string
    data: {
        postId: string
        postTitle: string
        startTime: string
        endTime: string
        availableSlot: number
        status: string
        areaName: string
        moneyPaid: number
        transacionId: string
        coverImage: string
        bookedInfos: {
            dateSlot: string
            slot: string[]
            pricePerSlot: number
        }[]
        chatRoomId: string
    }[]
}

export interface ListTransactionData {
    postId: string
    postTitle: string
    startTime: string
    endTime: string
    availableSlot: number
    status: string
    areaName: string
    moneyPaid: number
    transacionId: string
    coverImage: string
    bookedInfos: {
        dateSlot: string
        slot: string[]
        pricePerSlot: number
    }[]
    chatRoomId: string
}

export interface HistoryTransaction {
    message: string
    data: {
        id: string
        idWallet: string
        idUser: string
        amount: number
        status: string
        time: string
        type: string
    }[]
}
export interface HistoryTransactionData {
    id: string
    idWallet: string
    idUser: string
    amount: number
    status: string
    time: string
    type: string
}