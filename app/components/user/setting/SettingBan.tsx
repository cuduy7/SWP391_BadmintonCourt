"use client"

import { AxiosClient, userBanUserService } from "@/services"
import { Button, Loading, LoadingFullScreen } from "../../providers"
import { listBlock, listBlockData } from "@/types"
import useSWR, { mutate } from "swr"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/contexts"
import { toast } from "react-toastify"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const SettingBan = () => {
    const { user, isLoading, setIsLoading } = useContext(GlobalContext) || {}
    const { data: initialListBlock, error } = useSWR<listBlock>(user && user.id ? `/api/users/${user.id}/banded_users` : null, fetcher)

    const isLoadingPage = !initialListBlock && !error

    const [listBlock, setListBlock] = useState<listBlockData[]>([])
    const [removedItems, setRemovedItems] = useState<listBlockData[]>([])

    useEffect(() => {
        if (initialListBlock) {
            setListBlock(initialListBlock.data)
        }
    }, [initialListBlock])

    const handleRemove = (item: listBlockData) => {
        setListBlock(listBlock.filter(i => i.userId !== item.userId))
        setRemovedItems([...removedItems, item])
    }

    const handleSave = async () => {
        if (setIsLoading) setIsLoading(true)

        if (user && user.id) {
            for (const item of removedItems) {
                const res = await userBanUserService({
                    user_id: Number(user.id),
                    user_effect: Number(item.userId)
                })

                if (res.data == null) {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT
                    })
                    if (setIsLoading) setIsLoading(false)
                    return
                }
            }

            toast.success("Gỡ BAN thành công!", {
                position: toast.POSITION.TOP_RIGHT
            })
            mutate(`/api/users/${user.id}/banded_users`)
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <div className="relative p-8 flex flex-col gap-5 h-full min-h-screen">
            <div className="text-gray-600 text-2xl md:text-3xl font-semibold">Danh sách người dùng đã chặn</div>
            <div className="border border-black border-opacity-10" />
            <div className="relative bg-[#F5F5F5] border border-black border-opacity-10 rounded-xl">
                {isLoadingPage ? (
                    <LoadingFullScreen loading={isLoadingPage} />
                ) : !initialListBlock || initialListBlock.data.length === 0 ? (
                    <div className="flex text-center items-center justify-center text-3xl md:text-4xl text-primary-blue-cus font-semibold h-[40rem]">
                        Không có ai trong danh sách chặn
                    </div>
                ) : (
                    <div className="flex flex-col p-6 gap-3 h-[40rem] overflow-auto">
                        {listBlock.map((items) => (
                            <div className="flex flex-row justify-between items-center" key={items.userId}>
                                <div className="text-gray-600 text-xl font-semibold">
                                    {items.userName}
                                </div>
                                <button className="cursor-pointer text-3xl" onClick={() => handleRemove(items)}>&times;</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="relative flex justify-center">
                {isLoading ? (
                    <Button
                        title={<Loading loading={isLoading} color="white"/>}
                        style="md:text-xl md:py-3 px-12"
                        isHover={false}
                    />
                ) : (
                    <Button
                        title="Lưu"
                        style="md:text-xl md:py-3 px-12"
                        onClick={handleSave}
                    />
                )}
            </div>
        </div>
    )
}

export default SettingBan