"use client"

import Image from "next/image"
import { ListProductData } from "@/types"
import { FormatTime, formatMoney, validateAddress, validateDes, validateName, validateURLAvatar, validateURLProduct } from "@/utils"
import Decimal from "decimal.js"
import Link from "next/link"

const ProductContent: React.FC<ListProductData> = ({
    idPost,
    title,
    contentPost,
    addressSlot,
    highlightUrl,
    imgUrlPost,
    days,
    startTime,
    endTime,
    price,
    quantitySlot,
    fullName,
    userImgUrl,
    userId,
}) => {
    return (
        <Link className="
                grid 
                md:grid-cols-11 
                grid-cols-1
                border-2 
                rounded-xl
                h-[20rem]
                w-auto
                mb-4
                relative
            "
            key={idPost}
            href={`/product/detail-product/${idPost}`}
        >
            <div className="md:col-span-5 col-span-1">
                <div className="
                        relative
                        md:h-full
                        sm:h-96
                        h-80
                        transition-all
                        duration-500
                        cursor-pointer
                    "
                >
                    <div className="
                            absolute 
                            top-0
                            left-0 
                            w-full 
                            h-full
                        "
                    >
                        <Image
                            src={validateURLProduct(highlightUrl)}
                            alt="QuickList"
                            className="
                                md:rounded-l-xl
                                md:rounded-r-none
                                rounded-t-xl
                                object-cover
                            "
                            placeholder="blur"
                            blurDataURL={validateURLProduct(highlightUrl)}
                            sizes="(max-width: 600px) 100vw, 600px"
                            fill
                        />
                    </div>
                </div>
            </div>
            <div className="md:col-span-6 col-span-1 p-4">
                <div className="
                        flex 
                        flex-col 
                        justify-around
                        h-full
                        gap-3
                    "
                >
                    <div>
                        <h3 className="text-3xl font-semibold text-[#922049] truncate">
                            {title}
                        </h3>
                    </div>                  
                    <div className="text-lg text-gray-500 line-clamp-2 min-h-[3rem]">
                        Mô tả ngắn: {validateDes(contentPost)}
                    </div>
                    <div className="space-x-1 text-lg text-gray-500">
                        <span>Địa điểm sân:</span>
                        <span className="font-semibold text-black">
                            {validateAddress(addressSlot)}
                        </span>
                    </div>                 
                    <div className="flex space-x-1 text-lg text-gray-500">
                        <span>Thời gian mở cửa:</span>
                        <span className="font-semibold text-black">
                            6:00-22:00
                        </span>
                    </div>                   
                </div>
            </div>
        </Link>
    )
}

export default ProductContent