import { FormatUI, VerifyOTPForm } from "@/app/components"

const VerifyOTPPage = () => {
    return (
        <FormatUI
            src="/images/background_3.png"
            title="Xác thực tài khoản"
            subTitle="Vui lòng nhập OTP đã gửi vào mail xác thực"
            body={<VerifyOTPForm />}
        />
    )
}

export default VerifyOTPPage