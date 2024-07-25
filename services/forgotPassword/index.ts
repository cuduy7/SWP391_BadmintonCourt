import { FormData, getOtp, sendMail } from '@/types'
import AxiosClient from '../AxiosInstance'

export const forgotPasswordService = async (data: getOtp) => {
    try {
        const response = await AxiosClient.get(`/api/users/${data.email}/verify_token`)

        return response.data
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getSuggestPlayer = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/posts/user/${id}/suggestion`)

        return response.data;
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const verifyOTPService = async (data: sendMail) => {
    try {
        const response = await AxiosClient.post('/api/users/verify_token', {
            verifyToken: data.otp,
            email: data.email,
        })

        return response.data;
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const changePasswordService = async (data: FormData) => {
    try {
        const response = await AxiosClient.put(`/api/users/${data.email}/new_pass`, {
            newPassword: data.password,
            reEnterPassword: data.confirmPassword,
        });

        return response.data;
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

