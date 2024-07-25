import Image from "next/image"
import Link from "next/link";

const IsMobileLogo = () => {
    return (
        <div className="
                flex 
                items-center 
                pt-1 
                pr-1 
                pb-1
            "
        >
            <Link href="/" className="flex relative">
                <Image
                    height="40"
                    src="/images/logo.png"
                    alt="Logo"
                    className="
                        cursor-pointer 
                        self-center 
                        fill-transparent
                        object-contain
                        h-auto
                        w-auto
                    "
                    width="40"
                />
            </Link>
        </div>
    )
}

export default IsMobileLogo