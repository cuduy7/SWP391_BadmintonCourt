import Container from "../Container"
import BlogCarousel from "./BlogCarousel"

const BlogOtherExtra = () => {
    return (
        <div className="relative py-10">
            <Container>
                <div className="flex flex-col mb-10">
                    <div className="
                            flex 
                            flex-row 
                            justify-between 
                            items-center
                            transition-all
                            duration-500
                        "
                    >
                        <div className="
                                w-1/3 
                                h-1 
                                bg-primary-blue-cus
                                hidden
                                lg:block
                            "
                        />
                        <div className="
                                text-primary-blue-cus
                                font-semibold
                                lg:text-4xl
                                text-3xl
                                uppercase
                                text-center
                                transition-all
                                duration-500
                            "
                        >
                            Tin Tức
                        </div>
                        <div className="
                                w-1/3 
                                h-1 
                                bg-primary-blue-cus
                                hidden
                                lg:block
                            "
                        />
                    </div>
                </div>
                <BlogCarousel />
            </Container>
        </div>
    )
}

export default BlogOtherExtra