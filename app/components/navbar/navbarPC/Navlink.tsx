"use client"

import { AiOutlineDown } from "react-icons/ai"
import { navLinks, navLinksAdmin, navLinksStaff } from "@/utils"
import { useContext, useState } from "react";
import NavlinkItem from "./NavlinkItem";
import Link from "next/link";
import { GlobalContext } from "@/contexts";

const NavLink = () => {
    const [openItemId, setOpenItemId] = useState<string | null>(null)
    const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false)
    const { user } = useContext(GlobalContext) || {}

    const handleMenuToggle = (itemId: string) => {
        if (openItemId === itemId) {
            setOpenItemId(null);
        } else {
            setOpenItemId(itemId);
        }
    }

    const handleDropdownMouseLeave = () => {
        setIsDropdownHovered(false);
    }

    const handleWrapperMouseLeave = () => {
        setOpenItemId(null);
    }

    const links = user && user.role && user.role.toLowerCase() === "staff" ? navLinksStaff : user && user.role && user.role.toLowerCase() === "admin" ? navLinksAdmin : navLinks 

    return (
        <ul
            className="
                xl:pl-5
                lg:pl-0
                flex 
                items-center 
                list-none 
                text-base
                text-gray-600
                font-bold
                gap-3
            "
            onMouseLeave={handleWrapperMouseLeave}
        >
            {links.map((item) => (
                <li
                    className="relative inline-flex"
                    key={item.id}
                >
                    <div className="
                            self-center
                            box-border
                            relative
                            transition
                            duration-300
                        "
                    >
                        {item.linkItems ? (
                            <button
                                className="
                                border-none
                                px-1
                                cursor-pointer
                            "
                                onClick={() => handleMenuToggle(item.id)}
                                onMouseEnter={() => setOpenItemId(item.id)}
                                onMouseLeave={handleDropdownMouseLeave}
                                aria-haspopup="true"
                                aria-expanded={openItemId === item.id ? "true" : "false"}
                                aria-label={item.label}
                                data-tag="menuToggleDiv"
                                type="button"
                            >
                                <div className="
                                        flex
                                        flex-nowrap
                                        flew-row
                                        items-start
                                        hover:text-primary-blue-cus
                                    "
                                >
                                    <div className="pr-5 py-1 uppercase">
                                        <span>
                                            {item.label}
                                        </span>
                                        <div className="inline-block ml-2">
                                            <div className="
                                                inline-flex 
                                                items-center 
                                                cursor-auto 
                                                align-middle
                                            "
                                            >
                                                <div className="
                                                        inline-flex 
                                                        items-center 
                                                        cursor-auto 
                                                        align-middle
                                                    "
                                                >
                                                    <AiOutlineDown size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        ) : (
                            <Link href={item.href || ""} legacyBehavior>
                                <a className="
                                        border-none 
                                        px-1 
                                        cursor-pointer
                                    "
                                >
                                    <div className="
                                            flex 
                                            flex-nowrap 
                                            flew-row 
                                            items-start
                                            hover:text-primary-blue-cus
                                        "
                                    >
                                        <div className="pr-5 py-1 uppercase">
                                            <span className="">{item.label}</span>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        )}
                        {(openItemId === item.id || isDropdownHovered) && (
                            <NavlinkItem linkItems={item.linkItems} />
                        )}
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default NavLink