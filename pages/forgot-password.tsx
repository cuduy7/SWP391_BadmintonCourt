import { FormatUI } from "@/app/components";
import { ForgotPasswordForm } from "@/app/components/user/forgotPassword";

const ForgotPasswordPage = () => {
    return (
        <FormatUI
            src="/images/background_3.png"
            title="Quên Mật Khẩu"
            subTitle="Nhập email đăng ký của bạn"
            body={<ForgotPasswordForm />}
        />
    );
};

export default ForgotPasswordPage
