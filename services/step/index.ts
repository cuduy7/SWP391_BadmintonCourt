import { StepFormData, PlayGroundFormData, PlayLevelFormData, PlayWayFormData } from "@/types"
import AxiosClient from "../AxiosInstance"

export const postPlaygroundService = async (data: PlayGroundFormData) => {
    try {
        const response = await AxiosClient.post(`/api/users/${data.userID}/playing_area`, {
            listArea: data.grounds
        })

        return response.data
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const postPlayLevelService = async (data: PlayLevelFormData) => {
    try {
        const response = await AxiosClient.post(`/api/users/${data.userID}/playing_level`, {
            point : data.levels
        })

        return response.data
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const postPlayWayService = async (data: PlayWayFormData) => {
    try {
        const response = await AxiosClient.post(`/api/users/${data.userID}/playing_way`, {
            playingWays : data.ways
        })

        return response.data
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getSuggestPlayerService = async (data: StepFormData) => {
    try {
        const response = await AxiosClient.get(`/api/posts/user/${data.userID}}/suggestion`);

        return response.data
    } catch (error: any) {
        //console.log(error)
        
        if (error && error.response) {
            return error.response.data
        }
    }
}