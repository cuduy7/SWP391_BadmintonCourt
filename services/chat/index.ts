import AxiosClient from "../AxiosInstance"

export const joinChatRoomService = async ({ user_id, room_id }: { user_id: string, room_id: string }) => {
    try {
        const response = await AxiosClient.post(`/api/chat/user/${user_id}/room/${room_id}/join`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getAllRoomService = async (id: string) => {
    try {
        const response = await AxiosClient.get(`/api/chat/user/${id}/rooms`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const getDetailRoomService = async ({ room_id }: { room_id: string }) => {
    try {
        const response = await AxiosClient.get(`/api/chat/${room_id}/detail`)

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const sendMessService = async ({ user_id, message, roomId }: { user_id: string, message: string, roomId: string }) => {
    try {
        const response = await AxiosClient.post(`/api/chat/user/${user_id}`, {
            message: message,
            roomId: Number(roomId)
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}

export const base64ToLinkProcess = async ({ imgUrl }: { imgUrl: string }) => {
    try {
        const response = await AxiosClient.post(`/api/image/images`, {
            imgUrl: imgUrl
        })

        return response.data
    } catch (error: any) {
        //console.log(error)

        if (error && error.response) {
            return error.response.data
        }
    }
}