import { OtherAccess } from "../../providers"

const LoginSubBody = () => {
    return (
        <div className="flex flex-row justify-between items-center">
            <div className="text-[#CCCCCC] whitespace-nowrap text-lg">
                Hoặc đăng nhập bằng
            </div>
            <OtherAccess />
        </div>
    )
}

export default LoginSubBody