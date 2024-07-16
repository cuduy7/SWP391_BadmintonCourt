import { FormatUI, LoginFooter, LoginForm } from "@/app/components";

const LoginPage = () => {
    return (
        <FormatUI
            src="/images/background_2.png"
            title="Đăng nhập"
            body={<LoginForm />}
            footer={<LoginFooter />}
        />
    );
};

export default LoginPage
