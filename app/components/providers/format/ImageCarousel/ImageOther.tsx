"use client"

import { validateURLProduct } from "@/utils"
import Image from "next/image"

const ImageItemOther = ({ src }: { src?: string | null }) => {
    return (
        <div className="
                relative
                h-full
                transition
                duration-300
                overflow-hidden
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
                    src={validateURLProduct(src)}
                    alt="QuickList"
                    className="rounded-lg object-center"
                    sizes="(max-width: 600px) 100vw, 100vw"
                    fill
                    draggable="false"
                    loading="lazy"
                    blurDataURL={validateURLProduct(src)}
                />
            </div>
        </div>
    )
}

export default ImageItemOther