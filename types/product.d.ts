export interface ProductFullField {
    id?: string | null
    idType?: string | null
    idUserTo?: string | null
    title?: string | null
    addressSlot?: string | null
    priceSlot?: number | null
    quantitySlot?: number | null
    levelSlot?: number | null
    categorySlot?: string | null  // replace with the actual type if not null
    contentPost?: string | null
    imgUrl?: string | null  // replace with the actual type if not null
    status?: boolean | null
    days?: string | null
    startTime?: string | null
    endTime?: string | null
    savedDate?: string | null
}

export interface ProductDetailContent {
    message: string
    data: {
        idPost?: string | null
        imageUrls?: string[] | string | null
        hightLightImage?: string
        title?: string | null
        addressSlot?: string | null
        levelSlot?: string | null
        contentPost?: string | null
        fullName?: string | null
        imgUrlUser?: string | null
        sortProfile?: string | null
        categorySlot?: string | null
        totalRate?: number | null
        userId?: string | null
        price: number
        postSlot?: {
            dateSlot: string
            slot: string[]
        }[]
    }
}
export interface ProductDetailContentData {
    id?: string | null
    idPost?: string | null
    imageUrls?: string[] | string | null
    hightLightImage?: string
    title?: string | null
    addressSlot?: string | null
    levelSlot?: string | null
    contentPost?: string | null
    fullName?: string | null
    imgUrlUser?: string | null
    sortProfile?: string | null
    categorySlot?: string | null
    totalRate?: number | null
    userId?: string | null
    price: number
    postSlot?: {
        dateSlot: string
        slot: string[]
    }[]
}

export interface ListProduct {
    message: string
    data: {
        id?: string | null
        idPost?: string | null
        imgUrl?: string | null
        title?: string | null
        addressSlot?: string | null
        days?: string | null
        startTime?: string | null
        endTime?: string | null
        status?: boolean | null
        contentPost?: string | null
        quantitySlot?: number | null
        fullName?: string | null
        userImgUrl?: string | null
        price?: number | null
        highlightUrl?: string | null
        imgUrlPost?: string[] | string | null
        userId?: string | null    
    }[]
}

export interface ListProductData {
    idPost?: string | null
    title?: string | null
    addressSlot?: string | null
    days?: string | null
    startTime?: string | null
    endTime?: string | null
    status?: boolean | null
    contentPost?: string | null
    quantitySlot?: number | null
    fullName?: string | null
    userImgUrl?: string | null
    price?: number | null
    highlightUrl?: string | null
    imgUrlPost?: string[] | string | null
    userId?: string | null
}

export interface ListCity {
    message: string
    data: {
        id: string
        name: string
    }[]
}
export interface ListDistrict {
    message: string
    data: {
        id: string
        name: string
    }[]
}
export interface ListDistrictData {
    id: string
    name: string
}
export interface ListWard {
    message: string
    data: {
        id: string
        name: string
    }[]
}

export interface ManagePost {
    message: string
    data: {
        title?: string | null
        postId?: string | null
        userId?: string | null
        userName?: string | null
        sortDescript?: string | null
        time?: string | null
        availableSlot?: number | null
        postImgUrl?: string | null
        userImgUrl?: string | null
        address?: string | null
        status?: boolean | null
        isDelete?: boolean | null
        userName?: string | null
    }[]
}

export interface ManagePostData {
    title?: string | null
    postId?: string | null
    userId?: string | null
    userName?: string | null
    sortDescript?: string | null
    time?: string | null
    availableSlot?: number | null
    postImgUrl?: string | null
    userImgUrl?: string | null
    address?: string | null
    status?: boolean | null
    isDelete?: boolean | null
    userName?: string | null
}

export interface Slot {
    dateSlot: string
    slots: {
        content: string
        status: number
        transactionId: string
    }[]
}

export interface SlotData {
    message: string
    data: Slot[]
}