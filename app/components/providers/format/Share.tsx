"use client"

import { BsFacebook } from "react-icons/bs"
import { VscLinkExternal } from "react-icons/vsc"
import { toast } from "react-toastify"

const Share = () => {
    const handleShare = () => {
        const url = window.location.href;
        const width = 600;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
        const features = `width=${width},height=${height},left=${left},top=${top}`;
        const newWindow = window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', features);
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Đã lấy đường link thành công!", {
            position: toast.POSITION.TOP_RIGHT
        })
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="text-2xl text-gray-600 font-semibold">
                Chia sẻ về bài viết này:
            </div>
            <div className="flex flex-row items-center space-x-5">
                <BsFacebook size={40} className="text-blue-600 cursor-pointer" onClick={handleShare}/>
                <VscLinkExternal size={40} className="cursor-pointer" onClick={handleCopyLink}/>
                <div className="flex-grow"></div>
            </div>
        </div>
    )
}

export default Share