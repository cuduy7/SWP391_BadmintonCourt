import { ChangePasswordForm, FormatUI } from "@/app/components"

const ChangePasswordPage = () => {

    return (
        <FormatUI 
            src="/images/background_3.png"
            title="Đổi Mật Khẩu"
            body={<ChangePasswordForm />}
        />
    )
}

export default ChangePasswordPage