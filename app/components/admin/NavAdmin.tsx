import Image from "next/image"
import Link from "next/link"

const NavAdmin = () => {
    return (
        <div className="relative w-full h-20 flex items-center justify-center bg-white shadow-sm">
            <Link href="/admin/admin-home">
                <section className="flex items-center space-x-2">
                    <Image
                        height="40"
                        src="/images/logo.png"
                        alt="logo"
                        className="object-contain w-8 h-8"
                        width="40"
                    />
                    <h1 className="uppercase text-xl font-semibold text-[#343B63]">
                    Vietnam Badminton Court (VBC)
                    </h1>
                </section>
            </Link>
        </div>
    )
}

export default NavAdmin