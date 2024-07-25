import { RegisterFormData } from '@/types'
import AxiosClient from '../AxiosInstance'

const registerService = async (data: RegisterFormData) => {
    try {
        const response = await AxiosClient.post('/api/users/register', {
            fullName: data.name,
            phoneNum: data.phone,
            email: data.email,
            password: data.password,
            reEnterPass: data.confirmPassword,
            userName: data.name.trim(),
        })

        return response.data;

    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export default registerService
