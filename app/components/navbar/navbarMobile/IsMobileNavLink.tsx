"use client"

import { navLinks, navLinksAdmin, navLinksStaff, useOutsideClick } from '@/utils'
import { useContext, useRef, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import IsMobileItem from './IsMobileItem'
import { useRouter } from 'next/navigation'
import { GlobalContext } from '@/contexts'

const IsMobileNavLink = () => {
    const [openItemId, setOpenItemId] = useState<string[]>([])
    const { user ,setShowMenu} = useContext(GlobalContext) || {}

    const handleOutsideClick = () => {
        if (setShowMenu) setShowMenu(false)
    }

    const ref = useRef<HTMLDivElement | null>(null)
    useOutsideClick(ref, handleOutsideClick)


    const router = useRouter()

    const handleMenuToggle = (itemId: string) => {
        if (openItemId.includes(itemId)) {
            setOpenItemId(openItemId.filter((id) => id !== itemId));
        } else {
            setOpenItemId([...openItemId, itemId]);
        }
    }

    const links = user && user.role && user.role.toLowerCase() === "staff" ? navLinksStaff : user && user.role && user.role.toLowerCase() === "admin" ? navLinksAdmin : navLinks 

    return (
        <div
            data-tag="dropdown-menu"
            className="
                bg-white
                px-4
                md:px-6
                py-2
                md:w-80
                w-full
                h-screen 
                fixed
                right-0
                top-16 
                overflow-auto
                font-bold
                text-lg
                text-gray-600
                z-[2000]
                transition-all
                duration-500
            "
            ref={ref}
        >
            <ul className="
                    list-none 
                    space-y-2
                "
            >
                {links.map((item) =>
                    <li
                        key={item.id}
                        className="
                            border-b-2 
                            py-2 
                        "
                    >
                        {item.linkItems ? (
                            <button
                                className="
                                    flex 
                                    flex-row 
                                    items-center 
                                    justify-between 
                                    h-4 
                                    w-full
                                    hover:bg-slate-200
                                    hover:text-primary-blue-cus
                                    px-4
                                    py-6
                                "
                                onClick={() => handleMenuToggle(item.id)}
                                aria-haspopup="true"
                                aria-expanded={openItemId.includes(item.id) ? 'true' : 'false'}
                                data-tag="dropdown-menu-item"
                            >
                                <span>{item.label}</span>
                                <span>
                                    <div className="inline-flex items-center">
                                        <AiOutlineDown size={16} />
                                    </div>
                                </span>
                            </button>
                        ) : (
                            <button
                                className="
                                    flex 
                                    flex-row 
                                    items-center 
                                    justify-between 
                                    h-4 
                                    w-full
                                    hover:bg-slate-200
                                    hover:text-primary-blue-cus
                                    cursor-pointer
                                    px-4
                                    py-6
                                "
                                type="button"
                                onClick={() => router.push(`${item.href}`)}
                            >
                                <span>{item.label}</span>
                            </button>
                        )}
                        {openItemId.includes(item.id) && <IsMobileItem linkItems={item.linkItems} />}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default IsMobileNavLink;
