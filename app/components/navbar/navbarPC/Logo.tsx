import Image from "next/image"
import Link from "next/link";

const Logo = () => {
    return (
        <div className="
                    flex
                    items-center
                    py-4
                    pr-4
                    relative
                "
        >
            <Link href="/" className="hidden xl:block relative" >
                <section className="flex items-center space-x-2">
                    <Image
                        height="150"
                        src="/images/logo.png"
                        alt="logo"
                        className="object-contain w-20 h-20"
                        width="150"
                    />
                    <h1 className="uppercase text-2xl font-semibold text-[#343B63]">
                        VBC
                    </h1>
                </section>
            </Link>
            <Link href="/" className="hidden xl:hidden lg:block relative">
                <Image
                    src="/images/logo.png"
                    alt="Logo"
                    height="40"
                    className="
                        cursor-pointer 
                        self-center 
                        fill-transparent
                        object-contain
                        w-auto
                        h-auto
                    "
                    width="40"
                />
            </Link>
        </div>
    )
}

export default Logo