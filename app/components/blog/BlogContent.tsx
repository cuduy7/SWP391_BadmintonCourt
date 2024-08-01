"use client"

import { BlogsDetail } from "@/types"
import { FormatDate } from "@/utils"
import ReactHtmlParser from 'react-html-parser'

const BlogContent: React.FC<BlogsDetail> = ({
    id,
    title,
    createTime,
    userCreateName,
    description
}) => {
    return (
        <section className="flex flex-col gap-10" key={id}>
            <section className="flex flex-col gap-3 text-center">
                <h1 className="text-4xl font-semibold">
                    {title}
                </h1>
                <h2 className="text-gray-500 text-xl font-normal">
                    <FormatDate dateString={createTime} />
                </h2>
            </section>
            <div className="relative flex flex-col items-center text-left gap-3 w-full">{ReactHtmlParser(description)}</div>
            <div className="ml-auto font-medium text-xl italic">
                By: {userCreateName}
            </div>
        </section>
    )
}

export default BlogContent