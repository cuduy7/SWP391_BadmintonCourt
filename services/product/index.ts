import { CreateBadmintonForm, UpdateForm, UpdateStatusForm } from "@/types"
import AxiosClient from "../AxiosInstance"

export const getListProductService = async () => {
    try {
        const response = await AxiosClient.get(`/api/posts/GetListPost`)

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getProductService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/posts/${id}/details`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getProductSuggestService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/posts/${id}/post_suggestion`)

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getAllDistrictService = async () => {
    try {
        const response = await AxiosClient.get(`/api/cities`)

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

// export const checkFreePostService = async (user_id: string) => {
//     try {
//         const response = await AxiosClient.put(`/api/posts/${user_id}/check_user_post`)

//         return response.data;
//     } catch (error: any) {
//         //console.log(error)

//         if (error && error.response) {
//             return error.response.data
//         }
//     }
// }

export const boostProductService = async (user_id: string, post_id: string) => {
    try {
        const response = await AxiosClient.put(`/api/posts/${user_id}&${post_id}/create_boost_charge`)

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const postSuggestionAIService = async (user_id: string) => {
    try {
        const response = await AxiosClient.get(`/api/posts/${user_id}/post_ai_suggestion`)

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const postChargeService = async (user_id: string) => {
    try {
        const response = await AxiosClient.put(`/api/posts/${user_id}/create_post_charge`)

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const postBadmintonService = async (data: CreateBadmintonForm) => {
    console.log(data)

    try {
        const response = await AxiosClient.post(`/api/posts/create_by/${data.id}`, {
            title: data.title,
            address: data.address,
            SlotInfor: data.slots,
            description: data.description,
            highlightUrl: data.highlightUrl,
            imgUrls: data.imgUrls,
        })

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const UpdateService = async (data: UpdateForm) => {
    console.log(data)

    try {
        const response = await AxiosClient.put(`/api/posts/update_post`, {
            idPost: data.id,
            slotInfor: data.slots,
        })

        return response.data;
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const UpdateStatusService = async (data: UpdateStatusForm) => {
    try {
        console.log(data);
        
        const response = await AxiosClient.put(`/api/transactions/status_info`, {
            idPost: data.idPost,
            idUser: data.idUser,
            postSlot: data.postSlot,
        })

        console.log(response);
        
        return response.data;
    } catch (error: any) {
        if (error && error.response) {
            return error.response.data
        }
    }
}