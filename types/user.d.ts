export interface Comment {
    message: string
    data: {
        userId?: string | null
        userAvatar?: string | null
        userName?: string | null
        totalRate?: number | null
        savedDate?: string | null
        content?: string | null
    }[]
}
export interface UserFullField {
    id?: string | null
    userName?: string | null
    userPassword?: string | null
    fullName?: string | null
    phoneNumber?: string | null
    userAddress?: string | null
    isActive?: boolean | null
    imgUrl?: string | null
    totalRate?: number | null
    rate?: number | null
    userRole?: string | null
    deviceToken?: string | null
    email?: string | null
    playingArea?: string | null
    playingLevel?: number | null
    playingWay?: string | null
    sortProfile?: string | null
    posts?: any[]
    tokens?: any[]
    transactions?: any[]
    userRatings?: any[]
    wallets?: any[]
    notifications?: any[]
}
export interface User {
    id?: string | null
    email?: string | null
    imgUrl?: string | null
    userName?: string | null
    userRole?: string | null
    sortProfile?: string | null
    skillLevel?: number | null
    rating?: number | null
    friendly?: number | null
    trusted?: number | null
    helpful?: number | null
    playingArea?: string[] | null
    playingLevel?: number | null
    playingWay?: string[] | null
    isActive?: boolean | null
    userAddress?: string | null
    phoneNumber?: string | null
    comments?: Comment[] | null
}
export interface UserSuggest {
    message: string
    data: {
        id?: string | null
        name?: string | null
        shortProfile?: string | null
        rating?: number | null
        imgUrl?: string | null
    }[]
}
export interface UserProfile {
    message: string
    data: {
        id?: string | null
        fullName?: string | null
        totalRate?: number | null
        imgUrl?: string | null
        sortProfile?: string | null
        levelSkill?: number | null
        friendly?: number | null
        trusted?: number | null
        helpful?: number | null
    }
}
export interface UserProfileData {
    id?: string | null
    fullName?: string | null
    totalRate?: number | null
    imgUrl?: string | null
    sortProfile?: string | null
    levelSkill?: number | null
    friendly?: number | null
    trusted?: number | null
    helpful?: number | null
}
export interface ListUser {
    message: string
    data: {
        id?: string | null
        imgUrl?: string | null
        userName?: string | nul
        sortProfile?: string | null
        totalRate?: number | null
        flagRegister?: boolean | false
    }[]
}
export interface ListUserData {
    id?: string | null
    imgUrl?: string | null
    userName?: string | nul
    sortProfile?: string | null
    totalRate?: number | null
    flagRegister?: boolean | false
}

export interface listBlock {
    message: string
    data: {
        userId: string
        userName: string
        imgUrl: string
    }[]
}

export interface listBlockData {
    userId: string
    userName: string
    imgUrl: string
}

export interface Notify {
    message: string
    data: {
        id: string
        title: string
        content: string
        about: string
        notiDate: string
        isRead: boolean
        referenceId: string
    }[]
}

export interface NotifyData {
    id: string
    title: string
    content: string
    about: string
    notiDate: string
    isRead: boolean
    referenceId: string
}

export interface RatingForm {
    idUserRate: string
    idUserRated: string
    levelSkill: Number
    friendly: Number
    trusted: Number
    helpful: Number
    content: string
    idTransaction: string
}
export interface RatingFormData {
    content: string
}

export interface WalletUserData {
    message: string
    data: {
        balance: string
    }
}

export interface CheckSub {
    data: {
        subed: boolean
    }
}