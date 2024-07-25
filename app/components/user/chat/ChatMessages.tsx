"use client"

import { AiOutlineSend } from "react-icons/ai"
import { FcAddImage } from "react-icons/fc"
import { Input, Loading, LoadingFullScreen } from "../../providers"
import Image from "next/image"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { GlobalContext } from "@/contexts"
import { AxiosClient, base64ToLinkProcess, sendMessService } from "@/services"
import { ChatDetail, ChatRoom, SendMessForm } from "@/types"
import useSWR from "swr"
import { processBase64Image, sendMessageSchema, validateURLAvatar } from "@/utils"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDropzone } from "react-dropzone"
import * as signalR from "@microsoft/signalr"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const ChatMessages = () => {
    const messagesRef = useRef<HTMLDivElement>(null)
    const { handleSubmit, register, reset } = useForm<SendMessForm>({
        resolver: yupResolver(sendMessageSchema)
    })
    const { user, roomId, setIsLoading, isLoading } = useContext(GlobalContext) || {}
    const [firstLoad, setFirstLoad] = useState(true)
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null)

    const { getRootProps, getInputProps, open } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        noClick: true,
        noKeyboard: true,
        onDrop: (acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader();

                reader.onload = async () => {
                    if (setIsLoading) setIsLoading(true)

                    const binaryStr = reader.result

                    if (binaryStr) {
                        const base64Rest = processBase64Image(binaryStr.toString())

                        const res = await base64ToLinkProcess({ imgUrl: base64Rest })

                        if (user && user.id && roomId && connection) {
                            await connection.invoke('SendMessage', res.imgUrl, user.id)
                            // .catch(err => console.error("Send mess", err))
                        }
                    }

                    if (setIsLoading) setIsLoading(false)
                }
                reader.readAsDataURL(file)
            })
        },
    })

    const sendMessage = async (data: SendMessForm) => {
        if (setIsLoading) setIsLoading(true)

        if (user && user.id && roomId && connection) {
            await connection.invoke('SendMessage', data.message, user.id)
            // .catch(err => console.error("Send mess", err))
            reset()
        }

        if (setIsLoading) setIsLoading(false)
    }

    const { data: listMessage, error: errorMessage, mutate: mutateMessage } = useSWR<ChatDetail>(roomId ? `/api/chat/${roomId}/detail?pageSize=100&pageNum=1` : null, fetcher)
    const { data: listRoom, mutate: mutateRoom } = useSWR<ChatRoom>(user && user.id ? `/api/chat/user/${user.id}/rooms` : null, fetcher)

    const isLoadingMessage = !listMessage && !errorMessage

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${process.env.API_BASE_URL}/chatHub`, {
                logger: signalR.LogLevel.Information,
                withCredentials: false,
            })
            .build()

        setConnection(newConnection)
    }, [])

    //console.log(connection?.state)

    useEffect(() => {
        const manageConnection = async () => {
            if (connection) {
                try {
                    await connection.stop();
                    //console.log('Kết nối đã dừng');
                } catch (err) {
                    //console.error('Không thể dừng kết nối: ', err);
                }

                if (roomId) {
                    try {
                        await connection.start();
                        //console.log("Kết nối thành công");
                        if (user && user.id) {
                            await connection.invoke('JoinRoom', roomId, user.id);
                        }
                    } catch (err) {
                        //console.error("Không thể kết nối: ", err);
                    }
                }
            }
        };

        manageConnection();
    }, [connection, roomId, user])

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", (user, message) => {
                //console.log("Nhận được tin nhắn từ " + user + ": " + message)
                mutateMessage()
                mutateRoom()
            })
        }
    }, [connection, mutateMessage, mutateRoom])

    const scrollToBottom = () => {
        if (messagesRef.current)
            messagesRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [listMessage?.data])

    useEffect(() => {
        if (listMessage) {
            setFirstLoad(false)
        }
    }, [listMessage])

    if (!listMessage && firstLoad) {
        return (
            <div className="md:col-span-9 col-span-10 flex justify-center items-center md:text-3xl text-2xl font-semibold text-primary-blue-cus">
                Vui lòng chọn nhóm chat
            </div>
        )
    }

    return (
        <div className="md:col-span-9 col-span-10 flex flex-col ">
            {isLoadingMessage ? (
                <div className="h-screen flex items-center justify-center">
                    <LoadingFullScreen loading={isLoadingMessage} />
                </div>
            ) : (
                <>
                    {listRoom && listRoom.data.filter(room => room.roomId === roomId).map((room) => (
                        <div className="md:py-4 py-2 md:px-6 px-8 flex flex-row justify-between border-b border-black border-opacity-10" key={room.roomId}>
                            <div className="flex space-x-2">
                                <div className="flex-shrink-0">
                                    <Image
                                        src={validateURLAvatar(room.coverImg)}
                                        alt={`roomId ${room.roomId}`}
                                        height={100}
                                        width={100}
                                        className="object-cover md:w-16 md:h-16 w-14 h-14 rounded-full"
                                    />
                                </div>
                                <section className="flex flex-col gap-1">
                                    <label className="font-semibold md:text-2xl text-lg truncate">{room.chatTitle}</label>
                                    <p className="text-gray-600 text-lg truncate">Đang hoạt động</p>
                                </section>
                            </div>
                            {/* <div className="relative flex items-center text-primary-blue-cus">
                                <CiMenuKebab size={40} />
                            </div> */}
                        </div>
                    ))}
                    <div id="messages-wrapper" className="flex-grow flex flex-col h-[40rem] overflow-auto py-2 px-6 gap-3 transition-all duration-500">
                        {listMessage && listMessage.data.map((mess) => (
                            mess.userId === user?.id ? (
                                <div className="flex flex-col items-end gap-1 text-lg" key={mess.messageId}>
                                    <div className="text-gray-500">
                                        Bạn
                                    </div>
                                    <div className="flex flex-row-reverse items-center">
                                        {mess.message.startsWith("https://res.cloudinary.com") ? (
                                            <div className="bg-transparent text-left rounded-lg flex-wrap break-words w-auto max-w-[24rem] md:max-w-[30rem] transition-all duration-500">
                                                <Image
                                                    src={mess.message}
                                                    alt={`Chat image ${mess.messageId}`}
                                                    width={500}
                                                    height={300}
                                                    placeholder="blur"
                                                    blurDataURL={mess.message}
                                                    className="object-contain rounded-lg"
                                                />
                                            </div>
                                        ) : mess.message.startsWith("https") ? (
                                            <a href={mess.message} className="px-4 py-2 bg-[#2768cf] text-left text-white rounded-lg border border-solid border-black border-opacity-10 flex-wrap break-words w-auto max-w-[14rem] md:max-w-[30rem] transition-all duration-500 text-sm font-medium hover:underline">
                                                {mess.message}
                                            </a>
                                        ) : (
                                            <div className="px-4 py-2 bg-[#2768cf] text-left text-white rounded-lg border border-solid border-black border-opacity-10 flex-wrap break-words w-auto max-w-[14rem] md:max-w-[30rem] transition-all duration-500 text-sm font-medium">
                                                {mess.message}
                                            </div>
                                        )}
                                        <div className="text-gray-500 pr-2 flex-shrink-0 whitespace-nowrap text-sm font-medium">
                                            {mess.sendTime}
                                        </div>
                                    </div>
                                </div>
                            ) : mess.userId == "65" ? (
                                <div className="flex flex-col gap-1 text-lg" key={mess.messageId}>
                                    <div className="flex flex-row space-x-2 items-center w-full justify-center">
                                        <div className="text-gray-600 transition-all duration-500 text-base font-semibold">
                                            {mess.message}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1 text-lg items-start" key={mess.messageId}>
                                    <div className="text-gray-500">
                                        {mess.sendUserName}
                                    </div>
                                    <div className="flex flex-row space-x-2 items-center">
                                        {mess.message.startsWith("https://res.cloudinary.com") ? (
                                            <div className="bg-transparent flex-wrap break-words w-auto max-w-[24rem] md:max-w-[30rem] transition-all duration-500">
                                                <Image
                                                    src={mess.message}
                                                    alt={`Chat image ${mess.messageId}`}
                                                    width={500}
                                                    height={300}
                                                    placeholder="blur"
                                                    blurDataURL={mess.message}
                                                    className="object-contain rounded-lg"
                                                />
                                            </div>
                                        ) : mess.message.startsWith("https") ? (
                                            <a href={mess.message} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg border border-solid border-black border-opacity-10 flex-wrap break-words w-auto max-w-[14rem] md:max-w-[30rem] transition-all duration-500 text-sm font-medium hover:underline">
                                                {mess.message}
                                            </a>
                                        ) : (
                                            <div className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg border border-solid border-black border-opacity-10 flex-wrap break-words w-auto max-w-[14rem] md:max-w-[30rem] transition-all duration-500 text-sm font-medium">
                                                {mess.message}
                                            </div>
                                        )}
                                        <div className="text-gray-500 flex-shrink-0 whitespace-nowrap text-sm font-medium">
                                            {mess.sendTime}
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                        <div ref={messagesRef} ></div>
                    </div>
                    <form className="flex justify-between items-center w-full border-t border-black border-opacity-10 px-6 py-2" onSubmit={handleSubmit(sendMessage)}>
                        <div className="relative w-full">
                            <Input
                                placeholder="Nhập tin nhắn"
                                colorInput="w-full ring-0 border-none px-0 text-lg pl-0 ml-0 py-0"
                                maxLength={999}
                                id="message"
                                name="message"
                                register={register}
                            />
                        </div>
                        <div className="flex flex-row space-x-3 items-center">
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <button type="button" onClick={open}>
                                    <FcAddImage size={40} />
                                </button>
                            </div>
                            {isLoading ? (
                                <Loading loading={isLoading} />
                            ) : (
                                <button className="relative text-primary-blue-cus" type="submit">
                                    <AiOutlineSend size={40} />
                                </button>
                            )}
                        </div>
                    </form>
                </>
            )
            }
        </div >
    )
}

export default ChatMessages