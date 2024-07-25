import { NavlinkItemProps } from "@/types"
import Link from "next/link"

const IsMobileItem: React.FC<NavlinkItemProps> = ({
    linkItems
}) => {
    return (
        <div 
            className="
                space-y-2 
                px-4
                mt-2
            " 
            data-tag="dropdown-menu-item"
        >
            <ul className="
                    list-none 
                    font-bold 
                    text-lg
                    text-gray-600
                "
            >
                {linkItems && linkItems.map((item) =>
                    <li key={item.id}>
                        {item.href ? (
                            <Link href={item.href} className="
                                    flex 
                                    flex-row 
                                    items-center 
                                    min-h-3 
                                    hover:bg-slate-200 
                                    hover:text-primary-blue-cus
                                    p-2
                                "
                            >
                                {item.label}
                            </Link>
                        ) : (<></>)}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default IsMobileItem