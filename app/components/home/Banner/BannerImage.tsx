import Image from "next/image"

const BannerImage = () => {
    return (
        <div className="
                col-span-3 
                absolute 
                w-8/12 
                h-full 
                bottom-0 
                -right-5 
                hidden
                lg:block
                transition-all
                duration-500
                overflow-hidden
            "
        >
            <div className="
                    h-full 
                    flex 
                    justify-end
                    transition-all
                    duration-500
                    relative
                "
            >
                <Image
                    src="/images/banner.png"
                    alt="Your Image"
                    className="object-contain object-bottom"
                    fill
                    draggable="false"
                    priority
                />
            </div>
        </div>
    )
}

export default BannerImage