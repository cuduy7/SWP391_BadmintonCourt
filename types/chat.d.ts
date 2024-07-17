export interface ChatRoom {
    message: string
    data: {
        roomId: string
        chatTitle: string
        coverImg: string
        lastSendMsg: string
        lastSendTime: string
    }[]
}

export interface ChatRoomData {
    roomId: string
    chatTitle: string
    coverImg: string
    lastSendMsg: string
    lastSendTime: string
}

export interface ChatDetail {
    message: string
    data: {
        messageId: string
        message: string
        userId: string
        sendTime: string
        sendUserName: string
    }[]
}

export interface ChatDetailData {
    messageId: string
    message: string
    userId: string
    sendTime: string
    sendUserName: string
}

export interface SendMessForm {
    message: string
}

export interface ListRoom {
    message: string
    data: {
        playDate: string
        id: string
    }[]
}

export interface ListRoomData {
    playDate: string
    id: string
}