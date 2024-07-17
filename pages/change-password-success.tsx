import { FormatUI } from "@/app/components"
import Link from "next/link"

const ChangePasswordSuccessPage = () => {
    const bodyContent = (
        <div className="flex flex-col gap-5 justify-center items-center py-5">
            <div className="relative w-32 h-32 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-8xl font-semibold text-gray-600">&#10003;</span>
            </div>
            <section className="flex flex-col gap-3 text-center">
                <h1 className="text-3xl font-semibold text-white">
                    Đổi mật khẩu thành công
                </h1>
                <p className="text-gray-400 text-xl font-medium">
                    Bạn đã đổi mật khẩu thành công
                </p>
            </section>
            <div className="flex gap-3">
                <Link href="/" className="bg-white border border-black border-opacity-10 text-xl font-semibold px-6 py-3 text-primary-blue-cus rounded-lg">
                    Trở về trang chủ
                </Link>
                <Link href="/login" className="bg-primary-blue-cus border border-primary-blue-cus border-opacity-10 text-xl font-semibold px-6 py-3 text-white rounded-lg">
                    Đăng nhập
                </Link>
            </div>
        </div>
    )

    return (
        <FormatUI
            src="/images/background_3.png"
            body={bodyContent}
        />
    )
}

export default ChangePasswordSuccessPage