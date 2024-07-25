import Link from "next/link"

const LoginFooter = () => {
    return (
        <div className="flex flex-col gap-4">
            <div className="border-b-2 border-white border-opacity-20"></div>
            <div className="flex font-medium text-lg text-white space-x-1">
                <span>Chưa có tài khoản?</span>
                <span className="underline cursor-pointer">
                    <Link href="./register">Đăng ký ngay</Link>
                </span>
            </div>
        </div>
    )
}

export default LoginFooter