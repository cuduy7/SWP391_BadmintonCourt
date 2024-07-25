import Link from "next/link"

const RegisterFooter = () => {
    return (
        <div className="
                flex 
                font-medium 
                text-lg
                text-white
                space-x-1
            "
        >
            <span>Đã có tài khoản?</span>
            <span className="underline cursor-pointer">
                <Link href="./login">
                    Đăng nhập ngay
                </Link>
            </span>
        </div>
    )
}

export default RegisterFooter