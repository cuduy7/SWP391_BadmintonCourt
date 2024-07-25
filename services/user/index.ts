import { CommentFormData, WalletFromData, UserProfileFormData, SettingPasswordForm, RatingForm } from "@/types"
import AxiosClient from "../AxiosInstance"

export const getListUserService = async () => {
    try {
        const response = await AxiosClient.get(`/api/users/GetListUser`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getUserProfileService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/users/${id}/profile`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getUserProfileSettingService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/users/user_id?user_id=${id}`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const putProfileUserService = async (data: UserProfileFormData) => {
    //console.log(data)

    try {
        const response = await AxiosClient.put(`/api/users/${data.id}`, {
            userName: data.userName,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            playingArea: data.playingArea,
            sortProfile: data.sortProfile,
            imgUrl: data.imgURL
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const postCommentService = async (data: CommentFormData) => {
    try {
        const response = await AxiosClient.post(`/api/users/${data.fromUserID}/comments/${data.toUserID}`, {
            content: data.content
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const updatePolicyService = async (user_id: string) => {
    try {
        const response = await AxiosClient.put(`/api/users/updatePolicy/${user_id}`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getCommentService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/users/${id}/comments`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const walletService = async (data: WalletFromData) => {
    try {
        const response = await AxiosClient.put(`/api/wallet/${data.id}`, {
            changes: data.money
        })

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const VNPAYService = async (data: WalletFromData) => {
    //console.log(data);

    try {
        const response = await AxiosClient.post(`/api/wallet/create-vnpay`, {
            changes: Number(data.money),
            userId: Number(data.id)
        })

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const userBanUserService = async ({ user_id, user_effect }: { user_id: number, user_effect: number }) => {
    try {
        const response = await AxiosClient.put(`/api/users/${user_id}/ban_unban/${user_effect}`)

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const settingPasswordService = async (data: SettingPasswordForm) => {
    try {
        const response = await AxiosClient.put(`/api/users/${data.userId}/setting_password`, {
            oldPass: data.oldPass,
            newPass: data.newPass,
            reEnterPass: data.reEnterPass
        })

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const subscribeService = async ({ user_id, target_id }: { user_id: string, target_id: string }) => {
    try {
        const response = await AxiosClient.put(`/api/users/${user_id}/sub_unsub/${target_id}`)

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const getUserService = async ({ user_id }: { user_id: string }) => {
    try {
        const response = await AxiosClient.get(`/api/users/${user_id}/getdetail`)

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const putNotifyService = async ({ notiIds }: { notiIds: string[] }) => {
    try {
        const response = await AxiosClient.put(`/api/notifications/readed`, {
            notiIds: notiIds
        })

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}

export const postRatingService = async (data: RatingForm) => {
    try {
        const response = await AxiosClient.post(`/api/users/rating_to`, {
            idUserRate: Number(data.idUserRate),
            idUserRated: Number(data.idUserRated),
            levelSkill: data.levelSkill,
            friendly: data.friendly,
            trusted: data.trusted,
            helpful: data.helpful,
            content: data.content,
            idTransaction: Number(data.idTransaction)
        })

        return response.data
    } catch (error: any) {
        if (error && error.status)
            //console.log(error)

            if (error && error.response) {
                return error.response.data
            }
    }
}