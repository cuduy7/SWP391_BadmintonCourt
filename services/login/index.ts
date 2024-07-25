import { LoginFormData } from '@/types';
import AxiosClient from '../AxiosInstance';

const loginService = async (data: LoginFormData) => {
    try {
        const response = await AxiosClient.post('/api/users/email_login', data)// nhập data vào đề check 

        return response.data
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
};

export default loginService;
