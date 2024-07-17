"use client"

import { useChangePasswordModal } from "@/hooks"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { settingPasswordService } from "@/services"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { settingPasswordInputs, settingPasswordSchema } from "@/utils"
import { SettingPasswordFormData } from "@/types"
import { yupResolver } from "@hookform/resolvers/yup"
import CustomModal from "../Modal"
import { Button, Input } from "../../form"
import { Loading } from "../../loader"

const ModalChangePassword = () => {
    const changePasswordModal = useChangePasswordModal()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<SettingPasswordFormData>({
        resolver: yupResolver(settingPasswordSchema)
    })
    const { user, setIsLoadingModal, isLoadingModal } = useContext(GlobalContext) || {}

    const onSubmit = async (data: SettingPasswordFormData) => {
        if (setIsLoadingModal) setIsLoadingModal(true)

        if (user && user.id) {
            const res = await settingPasswordService({
                userId: user.id,
                oldPass: data.oldPass,
                newPass: data.newPass,
                reEnterPass: data.reEnterPass
            })

            if (res.data == null) {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                if (setIsLoadingModal) setIsLoadingModal(false)
                return
            }

            toast.success("Đổi mật khẩu thành công", {
                position: toast.POSITION.TOP_RIGHT
            })
            changePasswordModal.onClose()
            reset()
        }

        if (setIsLoadingModal) setIsLoadingModal(false)
    }

    return (
        <CustomModal
            isOpen={changePasswordModal.isOpen}
            onClose={changePasswordModal.onClose}
            width="lg:w-2/4 md:3/4 w-full"
            height="h-auto"
        >
            <form className="flex flex-col md:px-10 pb-5 gap-5 justify-center items-center text-gray-600 w-full" onSubmit={handleSubmit(onSubmit)}>
                <label className="font-semibold text-3xl truncate relative pb-5">Thay đổi mật khẩu</label>
                {settingPasswordInputs.map((input, index) => (
                    <div className="flex sm:flex-row flex-col gap-3 sm:gap-0 sm:space-x-3 text-xl w-full sm:items-center relative" key={index}>
                        <label className="font-semibold flex-shrink-0 w-60 text-left">
                            {input.label}
                        </label>
                        <div className="relative w-full">
                            <Input
                                id={input.id}
                                name={input.name}
                                register={register}
                                type={input.type}
                                colorInput="bg-[#F5F5F5] w-full border-none text-xl"
                                errors={errors}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex ml-auto pt-5">
                    {isLoadingModal ? (
                        <Button
                            title={<Loading loading={isLoadingModal} color="white" />}
                            isHover={false}
                            style="py-3 px-12"
                            type="submit"
                        />
                    ) : (
                        <Button
                            title="Lưu"
                            style="py-3 px-12"
                            type="submit"
                        />
                    )}
                </div>
            </form>
        </CustomModal>
    )
}

export default ModalChangePassword