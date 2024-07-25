"use client"

import { GlobalContext } from "@/contexts"
import { Button, Input, Loading } from "../../providers"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { commentSchema, handleChange } from "@/utils"
import { postCommentService } from "@/services"
import { toast } from "react-toastify"
import { yupResolver } from "@hookform/resolvers/yup"
import { CommentForm } from "@/types"
import { mutate } from "swr"
import { useUnauthorizeModal } from "@/hooks"

const UserFormComment = ({ id }: { id: string }) => {
    const { user, setIsLoading, isLoading, isAuthUser } = useContext(GlobalContext) || {}
    const [formData, setFormData] = useState({
        comment: ""
    })
    const unauthorizeModal = useUnauthorizeModal()

    const { register, handleSubmit, formState: { errors } } = useForm<CommentForm>({
        resolver: yupResolver(commentSchema)
    })

    const onSubmit = async () => {
        if (setIsLoading) setIsLoading(true)

        if (user && user.id) {
            const res = await postCommentService({
                fromUserID: user.id,
                content: formData.comment,
                toUserID: id
            })

            //console.log(res)

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoading) setIsLoading(true)
                return
            }

            mutate(`/api/users/${id}/comments`)
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <form className={`relative gap-5 py-10 ${user && user.id && user.id.toString() === id.toString() || user && user.role && user.role.toLowerCase() !== "user" ? "hidden" : "flex flex-col"}`} onSubmit={handleSubmit(onSubmit)}>
            <div className="md:text-4xl text-3xl font-semibold text-gray-600">
                Bình luận
            </div>
            <div className="grid grid-cols-9 md:gap-5 gap-2">
                <div className="sm:col-span-8 col-span-7">
                    <Input
                        flagInput
                        rowArea={6}
                        maxLength={500}
                        colorInput="text-xl h-full"
                        placeholder="Nhập bình luận..."
                        register={register}
                        type="text"
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={(e) => handleChange(e, setFormData)}
                        errors={errors}
                    />
                </div>
                <div className="sm:col-span-1 col-span-2">
                    {isAuthUser ? (
                        isLoading ? (
                            <Button
                                title={<Loading loading={isLoading} color="white" />}
                                style="h-full w-full justify-center rounded-xl text-xl"
                                type="submit"
                                isHover={false}
                            />
                        ) : (
                            <Button
                                title="Bình luận"
                                style="h-full w-full justify-center rounded-xl text-xl"
                                type="submit"
                                disabled={user ? user.id?.toString() === id.toString() : false}
                            />
                        )
                    ) : (
                        <Button
                            title="Bình luận"
                            style="h-full w-full justify-center rounded-xl text-xl"
                            onClick={unauthorizeModal.onOpen}
                        />
                    )}
                </div>
            </div>
        </form>
    )
}

export default UserFormComment