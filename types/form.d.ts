export interface FormData {
    id?: string
    email?: string 
    password?: string 
    phone?: string 
    password?: string 
    confirmPassword?: string 
    otp?: string 
}
export interface LoginFormData {
    email: string 
    password: string 
}
export interface RegisterFormData {
    name: string 
    email: string 
    phone: string 
    password: string 
    confirmPassword: string 
}
export interface OTP {
    digit: string 
}
export interface getOtp {
    email: string 
}
export interface sendMail {
    email: string 
    otp: string 
}

export interface ChangePasswordFormData {
    password: string 
    confirmPassword: string 
}

export interface StepFormData {
    userID?: string 
    grounds?: string[] 
    level?: number 
    way?: string[] 
}
export interface PlayGroundFormData {
    userID: string 
    grounds: string[] 
}
export interface PlayLevelFormData {
    userID: string 
    levels: number 
}
export interface PlayWayFormData {
    userID: string 
    ways: string[] 
}

export interface UserProfileSettingForm {
    userName: string 
    fullName: string 
    phoneNumber: string 
    playingArea: string 
    sortProfile: string 
    imgURL: string
}
export interface UserProfileFormData {
    id?: string | null 
    userName?: string | null 
    fullName?: string | null 
    phoneNumber?: string | null 
    playingArea?: string | null 
    sortProfile?: string | null 
    imgURL?: string | null
}

export interface CommentFormData {
    fromUserID: string
    content: string
    toUserID: string
}
export interface CommentForm {
    comment: string
}

export interface CreateBadmintonForm {
    id: string 
    title: string 
    address: string 
    slots: {
        TimeSlot: string[]
        Price: number
    }
    description: string 
    highlightUrl: string 
    imgUrls: string[] 
}

export interface UpdateForm {
    id: string 
    slots: {
        TimeSlot: string[]
        Price: number
    }
}

export interface UpdateStatusForm {
    idPost: string
    idUser: string
    postSlot: {
        dateSlot: string
        slot: string[]
    }[]
}

export interface ReportUserFormData {
    fromUserID: string
    tittle: string
    content: string
    toUserID: string
}

export interface WalletFromRecharge {
    money: number
}

export interface WalletFrom {
    idUser?: string
    bankName?: string
    accountName: string
    bankNumber: string
    money: number
}

export interface WalletFromData {
    id: string
    money: number
}

export interface CheckSlotFormData {
    userId: string
    postId: string
    slotsInfo: {
        dateRegis: string
        numSlots: number
    }[]
    isVnpay: boolean
}

export interface BuySlotFormData {
    idUser: string
    idPost: string
    postSlot: any
}

export interface SettingPasswordForm {
    userId: string
    oldPass: string
    newPass: string
    reEnterPass: string
}
export interface SettingPasswordFormData {
    oldPass: string
    newPass: string
    reEnterPass: string
}