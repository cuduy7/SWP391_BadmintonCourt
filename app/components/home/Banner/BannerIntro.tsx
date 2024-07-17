"use client"

import { GlobalContext } from "@/contexts"
import { useUnauthorizeModal } from "@/hooks"
import { postSuggestionAIService } from "@/services"
import { useContext } from "react"
import { Loading } from "../../providers"

const BannerIntro = () => {
    const { user, setAIListProduct, isLoading, setIsLoading } = useContext(GlobalContext) || {}
    const unauthorizeModal = useUnauthorizeModal()

    const handleClick = async () => {
        if (setIsLoading) setIsLoading(true)

        if (!user) {
            unauthorizeModal.onOpen()
            if (setIsLoading) setIsLoading(false)
            return
        }

        if (user && user.id) {
            const res = await postSuggestionAIService(user.id)

            if (setAIListProduct) setAIListProduct(res.data)
        }

        if (setIsLoading) setIsLoading(false)
    }

    return (
        <div className="lg:col-span-2 pb-5">
            <div className="
                    flex 
                    flex-col 
                    text-white 
                    gap-5
                    justify-center
                    items-center
                    max-w-xl
                    lg:max-w-md 
                    lg:items-baseline
                    transition-all
                    duration-500
                "
            >
                <h1 className="
                        xl:text-5xl
                        xl:leading-tight
                        lg:text-4xl
                        lg:text-left
                        md:text-5xl
                        md:leading-tight
                        text-4xl
                        text-center
                        font-semibold 
                        uppercase
                        transition-all
                        duration-500
                    "
                >
                    Bạn muốn tìm sân để chơi cầu lông?
                </h1>
                <p className="
                        text-gray-300
                        text-lg
                        text-center 
                        lg:text-left
                        transition-all
                        duration-500
                    "
                >
                    VBM là trang mạng xã hội về cầu lông dành cho những người đam mê thể thao nói chung và cầu lông nói riêng. Tại đây các bạn sẽ được gặp gỡ những người chơi thân thiện và hòa đồng. Hãy cùng chúng tôi phát triển một cộng đồng cầu lông và phát triển sức khỏe nhé.
                </p>
                <div className="
                        relative
                        flex 
                        mt-5
                    "
                >
                    {isLoading ? (
                        <button
                            className={`
                                bg-white
                                text-primary-blue-cus
                                px-[5.5rem] 
                                py-3
                                w-[210px]
                                h-[56px]
                                rounded-lg
                                font-bold
                                whitespace-nowrap
                                cursor-pointer
                                flex
                                items-center
                            `}
                        >
                            <div className="
                                    flex
                                    flex-nowrap
                                    flew-row
                                    items-start
                                "
                            >
                                <Loading loading={isLoading}/>
                            </div>
                        </button>
                    ) : (
                        <button
                            className={`
                                hover:text-white
                                hover:bg-primary-blue-cus
                                bg-white
                                text-primary-blue-cus
                                px-12 
                                py-4 
                                rounded-lg
                                font-bold
                                whitespace-nowrap
                                cursor-pointer
                                flex
                                items-center
                            `}
                            onClick={handleClick}
                            type="button"

                        >
                            <div className="
                                    flex
                                    flex-nowrap
                                    flew-row
                                    items-start
                                "
                            >
                                <span>
                                    Tìm sân nhanh
                                </span>
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BannerIntro