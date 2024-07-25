"use client"

import { NavlinkItemProps } from "@/types"
import Link from "next/link"

const NavlinkItem: React.FC<NavlinkItemProps> = ({
    linkItems
}) => {
    return (
        <div
            data-tag="dropdown-list"
            className="
                absolute
                top-0
                -left-2
                bottom-auto
                right-auto
                shadow-md
                transform 
                translate-y-8
                overflow-auto
                z-[1000]
                max-h-72
                bg-white
                rounded-md
                pb-2
                min-w-[100px]
                max-w-[200px]
            "
        >
            <div className="p-4">
                <div className="
                        overflow-y-visible 
                        whitespace-normal 
                        -m-4
                    "
                >
                    <ul className="
                            list-none 
                            mt-2 
                            text-left
                            text-gray-600
                        "
                    >
                        {linkItems && linkItems.map((item) => (
                            <li
                                className="hover:bg-slate-200 hover:text-primary-blue-cus whitespace-nowrap"
                                key={item.id}
                            >
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="
                                            block 
                                            cursor-pointer 
                                            px-4 
                                            py-2
                                        "
                                    >
                                        {item.label}
                                    </Link>
                                ) : (<></>)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavlinkItem