"use client"

import { ListBlogsData } from "@/types";
import { validateURLProduct } from "@/utils";
import Image from "next/image"
import Link from "next/link";

const BlogItemOther: React.FC<ListBlogsData> = ({
    id,
    title,
    imgUrl,
    createTime,
    summary
}) => {
    return (
        <Link href={`/blog/${id}`}>
            <div className="
                col-span-1
                grid
                grid-cols-3
                rounded-xl
                border-2
                border-black
                border-opacity-10
                cursor-pointer
                transition-all
                duration-500
            "
                key={id}
            >
                <div className="
                        relative
                        col-span-1
                        h-full
                        transition-all
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
                            src={validateURLProduct(imgUrl)}
                            alt="blog"
                            className="
                                rounded-xl 
                                object-cover
                            "
                            fill
                            sizes="(max-width: 600px) 100vw, 600px"
                            placeholder="blur"
                            blurDataURL={validateURLProduct(imgUrl)}
                            draggable="false"
                        />
                    </div>
                </div>
                <div className="col-span-2 p-6 flex flex-col gap-5">
                    <section className="flex flex-col gap-3">
                        <h1 className="text-xl font-semibold text-gray-600 line-clamp-2 min-h-[3.5rem]">
                            {title}
                        </h1>
                        <p className="text-gray-500 text-lg line-clamp-5 min-h-[8.75rem]">
                            {summary}
                        </p>
                    </section>
                    <div className="text-[#8B96A5] text-lg ml-auto">
                        {createTime}
                    </div>
                </div>
            </div>
        </Link>

    )
}

export default BlogItemOther