import { ListProductData } from "@/types";
import { formatMoney, validateTitle, validateURLProduct } from "@/utils";
import Decimal from "decimal.js";
import Image from "next/image";
import Link from "next/link";

interface SearchResultProps {
    results: ListProductData[]
}

const SearchResult: React.FC<SearchResultProps> = ({ results }) => {
    return (
        <div className="
                absolute 
                bg-white 
                lg:w-72 
                lg:top-10 
                max-h-96
                right-0 
                w-full
                overflow-auto
                shadow-xl
                flex
                flex-col
            "
        >
            {results.map(((result) => (
                <Link href={`/product/detail-product/${result.idPost}`} className="flex gap-3 transition-all duration-300 py-1 pr-2 hover:bg-slate-200" key={result.idPost}>
                    <div className="relative flex-shrink-0">
                        <Image
                            src={validateURLProduct(result.highlightUrl)}
                            alt={`product ${result.idPost}`}
                            className="object-cover h-24 w-24"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col gap-1 lg:w-44 w-full">
                        <div className="font-semibold text-xl text-gray-600 truncate">
                            {validateTitle(result.title)}
                        </div>
                        <div className="text-gray-500 font-medium">
                            Chỗ còn trống: {result.quantitySlot ?? 0}
                        </div>
                        <div className="font-semibold text-primary-blue-cus text-xl lg:text-base lg:text-left text-right">
                            {formatMoney(new Decimal(result.price ?? 0))}/Chỗ
                        </div>
                    </div>
                </Link>
            )))}
        </div>
    )
}

export default SearchResult