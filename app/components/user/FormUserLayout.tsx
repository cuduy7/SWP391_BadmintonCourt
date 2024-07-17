"use client"

import { IoIosArrowRoundBack } from "react-icons/io"
import { FormatUIProps } from "@/types"
import { useContext } from "react"
import { GlobalContext } from "@/contexts"
import { useRouter } from "next/router"
import { Background } from "../providers"
import Cookies from "js-cookie"

const FormatUI: React.FC<FormatUIProps> = ({
    src,
    title,
    subTitle,
    subBody,
    body,
    footer,
}) => {
    const { setUser, setIsAuthUser, setIsRefresh } = useContext(GlobalContext) || {}
    const router = useRouter()

    const handleBack = async () => {
        if (setUser && setIsAuthUser) {
            setUser(null)
            setIsAuthUser(false)
        }
        Cookies.remove("token")
        localStorage.clear()
        router.push("/").then(() => {
            if (setIsRefresh) {
                setIsRefresh(true)
            }
        })
    }

    return (
        <Background src={src}>
            <div className="
                    relative 
                    w-auto 
                    h-screen 
                    px-10
                    flex 
                    items-center 
                    justify-center
                    transition
                    duration-500
                "
            >
                <div className="
                        absolute 
                        top-0 
                        left-0 
                        p-8
                        md:block
                        hidden
                    "
                >
                    <button className="
                            flex 
                            flex-row 
                            items-center 
                            space-x-1 
                            cursor-pointer
                            text-white
                        "
                        type="button"
                        onClick={handleBack}
                    >
                        <span>
                            <IoIosArrowRoundBack size={40} />
                        </span>
                        <span className="font-semibold">
                            Quay lại
                        </span>
                    </button>
                </div>
                <div className="
                        relative 
                        bg-white 
                        bg-opacity-20 
                        inset-0
                        rounded-xl
                        py-2
                        px-8
                        w-[32rem]
                    "
                >
                    <div className="flex flex-col gap-3">
                        {title && (
                            <div className="flex flex-row justify-between">
                                <section className="
                                        text-white
                                        text-3xl 
                                        font-semibold 
                                        py-2
                                        space-y-2
                                    "
                                >
                                    <h1>
                                        {title}
                                    </h1>
                                    {subTitle && (
                                        <p className="text-xl font-normal text-gray-400">
                                            {subTitle}
                                        </p>
                                    )}
                                </section>
                            </div>
                        )}
                        <button className="absolute top-3 right-6 md:hidden" type="button" onClick={handleBack}>
                            <span className="text-4xl text-white font-semibold">&times;</span>
                        </button>
                        <div className="relative">
                            {body}
                        </div>
                        {subBody && (
                            <div className="relative">
                                {subBody}
                            </div>
                        )}
                        {footer && (
                            <div className="relative">
                                {footer}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Background>
    )
}

export default FormatUI