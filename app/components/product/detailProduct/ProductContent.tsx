import { ProductDetailContentData } from "@/types";
import ProductDetail from "./ProductDetail"
import { ImageCarousel } from "../../providers";

const ProductContent: React.FC<ProductDetailContentData> = ({
    id,
    imageUrls,
    levelSlot,
    categorySlot,
    addressSlot,
    postSlot,
    title,
    price,
    userId
}) => {
    return (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-5 py-5 bg-gray-200 rounded-lg px-5 mt-10">
            <div className="lg:col-span-6 md:h-[30rem] sm:h-[26rem] h-80 lg:h-full transition-all duration-500">
                <ImageCarousel
                    key={id}
                    id={id}
                    imageUrls={imageUrls}
                    price={price}
                />
            </div>
            <div className="lg:col-span-6">
                <ProductDetail
                    key={id}
                    id={id}
                    levelSlot={levelSlot}
                    categorySlot={categorySlot}
                    addressSlot={addressSlot}
                    postSlot={postSlot}
                    title={title}
                    price={price}
                    userId={userId}
                />
            </div>
        </div>
    )
}

export default ProductContent