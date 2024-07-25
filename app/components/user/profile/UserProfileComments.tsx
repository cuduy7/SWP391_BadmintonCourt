"use client"

import Image from "next/image"
import { Rating } from "../../providers/format"
import React, { useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";
import { validateDate, validateDes, validateName, validateURLAvatar } from "@/utils";
import { AxiosClient } from "@/services";
import { Comment } from "@/types";
import useSWR from "swr";
import { LoadingFullScreen } from "../../providers";
import { format, parseISO } from "date-fns";

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const UserProfileComments = ({ id }: { id: string }) => {
    const [showMoreComments, setShowMoreComments] = useState(false);
    const initialCommentCount = 3;
    const { data: listComment, error } = useSWR<Comment>(`/api/users/${id}/comments`, fetcher, { refreshInterval: 10000 })

    const isLoading = !listComment && !error

    const displayedComments = showMoreComments
        ? listComment?.data
        : listComment?.data.slice(0, initialCommentCount)

    const handleShowMoreClick = () => {
        setShowMoreComments(true)
    };

    return (
        <div className="relative flex flex-col gap-5" key={id}>
            <div className="md:text-4xl text-3xl font-semibold text-gray-600">
                Lời bình luận
            </div>
            <div className="border-2 border-gray-300" />
            {isLoading ? (
                <LoadingFullScreen loading={isLoading} />
            ) : !displayedComments || displayedComments.length === 0 ? (
                <div className="flex items-center justify-center text-primary-blue-cus md:text-4xl text-3xl font-semibold h-96">
                    Không có lời bình luận nào cả
                </div>
            ) : (
                <React.Fragment>
                    {displayedComments.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-row gap-5 items-center">
                                    <div className="relative flex-shrink-0">
                                        <Image
                                            src={validateURLAvatar(item.userAvatar)}
                                            alt="avatar"
                                            width="100"
                                            height="100"
                                            className="rounded-full object-cover w-24 h-24"
                                        />
                                    </div>
                                    <div className="">
                                        <div className="flex flex-col gap-2">
                                            <div className="text-2xl font-semibold">
                                                {validateName(item.userName)}
                                            </div>
                                            <div className="relative">
                                                <Rating rating={item.totalRate ?? 0} maxStars={5} sizeCus={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <div className="text-gray-500 text-right font-medium text-lg">
                                            {format(parseISO(validateDate(item.savedDate)), 'dd/MM/yyyy HH:mm:ss')}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-xl text-gray-600 font-medium">
                                    {validateDes(item.content)}
                                </div>
                            </div>
                            {index < displayedComments.length - 1 && (
                                <div className="border-b-2 border-gray-300" key={`divider-${item.userId ?? "1"}`} />
                            )}
                        </React.Fragment>
                    ))}
                    {!showMoreComments && listComment && listComment.data && listComment.data.length > initialCommentCount && (
                        <div className="ml-auto">
                            <button
                                className="text-gray-600 text-xl font-semibold cursor-pointer flex items-center space-x-1"
                                onClick={handleShowMoreClick}
                            >
                                <span>Xem thêm ({listComment.data.length - initialCommentCount})</span>
                                <span className="inline-block">
                                    <BsChevronDoubleDown />
                                </span>
                            </button>
                        </div>
                    )}
                </React.Fragment>
            )
            }
        </div >
    )
}

export default UserProfileComments