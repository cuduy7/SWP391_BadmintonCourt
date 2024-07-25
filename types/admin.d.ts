import { UserReportManagement } from '@/app/components';
export interface ManageUser {
    message: string
    data: {
        userId: string | null
        fullName: string | null
        createDate: string | null
        role: string | null
        status: string | null
        lastLogin: string | null
    }[]
}

export interface ManageUserData {
    userId: string | null
    fullName: string | null
    createDate: string | null
    role: string | null
    status: string | null
    lastLogin: string | null
}

export interface UserDetailManage {
    message: string
    data: {
        id: string
        fullName: string
        role: string
        isBanded: boolean
        posts?: {
            id: string
            title: string
            postTime: string
            numOfReport: number
        }[]
    }
}

export interface UserManagePostData {
    id: string
    title: string
    postTime: string
    numOfReport: number
}

export interface UserReportManagement {
    message: string
    data: {
        id: string
        content: string
        title: string | null
        dateReceive: string
        status: string | null
        navigationId: string
        objectNavigation: string
    }[]
}

export interface UserReportManagementData {
    id: string
    content: string
    title: string | null
    dateReceive: string
    status: string | null
    navigationId: string
    objectNavigation: string
}

export interface AdminSetting {
    message: string
    data: {
        settingId: string
        settingName: string
        settingAmount: number
    }[]
}

export interface AdminSettingData {
    settingId: string
    settingName: string
    settingAmount: number
}
export interface AdminSettingListData {
    listSettingData: AdminSettingData[]
}

export interface ManagementReportData {
    id: string
    amount: number
    status: string
    time: string
    type: string
}

export interface ManagementReport {
    message: string
    data: {
        historyWalletModels: {
            id: string
            amount: number
            status: string
            time: string
            type: string
        }[]
        total: number
    }
}

export interface UserReportDetailForm {
    message: string
    data: {
        reportId?: string | null
        userReportId?: string | null
        userSendId?: string | null
        sendUserName?: string | null
        reportStatus?: number | null
        reportUserName?: string | null
        reportType?: number | null
        titleReport?: string | null
        contentReport?: string | null
        isBan?: boolean | null
        reportPost?: {
            postId?: string | null
            postName?: string | null
            postContent?: string | null
            postDate?: string | null
            postAddress?: string | null
            postImage?: string | null
        }
        reportTrans?: {
            transId?: string | null
            transDate?: string | null
            transMoney?: string | null
        }
    }
}

export interface UserReportDetailData {
    data: {
        reportId?: string | null
        userReportId?: string | null
        sendUserName?: string | null
        userSendId?: string | null
        reportStatus?: number | null
        reportUserName?: string | null
        reportType?: number | null
        titleReport?: string | null
        contentReport?: string | null
        isBan?: boolean | null
        reportPost?: {
            postId?: string | null
            postName?: string | null
            postContent?: string | null
            postDate?: string | null
            postAddress?: string | null
            postImage?: string | null
        }
        reportTrans?: {
            transId?: string | null
            transDate?: string | null
            transMoney?: string | null
        }
    }
}

export interface ListRequestWithdraw {
    message: string
    data: {
        id: string
        idUser: string
        money: number
        createDate: string
        acceptDate: string
        status: number
        bankName: string
        accountName: string
        bankNumber: string
    }[]
}