"use client"

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { useContext, useState } from "react"
import { GlobalContext } from "@/contexts"
import { FaFilter } from "react-icons/fa"

const FilterCus = () => {
    const { listDistrict, setSaveDistrict, saveDistrict } = useContext(GlobalContext) || {}

    const [isDropdownOpen, setIsDropdownOpen] = useState(true)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    return (
        <div className="lg:col-span-1 flex flex-col gap-3">
            <div className="flex flex-row text-gray-600 justify-between items-center">
                <div className="flex whitespace-nowrap items-center space-x-2">
                    <FaFilter size={20} />
                    <span className="font-semibold text-xl">Bộ lọc tìm kiếm</span>
                </div>
                {saveDistrict && (
                    <button 
                        className="text-lg hover:underline text-gray-500 font-medium"
                        onClick={() => {
                            if (setSaveDistrict) setSaveDistrict(null)
                        }}
                    >
                        Xóa lọc
                    </button>
                )}
            </div>
            <div className="relative">
                <ul className="py-2">
                    <li className="relative py-2">
                        <button className="
                                border-solid
                                border-2 
                                flex 
                                whitespace-nowrap 
                                justify-between
                                items-center 
                                w-full 
                                text-bg
                                p-3
                                rounded-md
                                transition
                                duration-500
                                text-gray-600
                            "
                            type="button"
                            id="dropdownMenuButton"
                            data-dropdown-toggle="dropdown"
                            aria-expanded="false"
                            onClick={toggleDropdown}
                        >
                            Chọn Chi Nhánh
                            <span>
                                {isDropdownOpen ?
                                    <AiFillCaretUp
                                        size={15}
                                        className="text-gray-400"
                                    />
                                    :
                                    <AiFillCaretDown
                                        size={15}
                                        className="text-gray-400"
                                    />}
                            </span>
                        </button>
                        <div
                            id="dropdown"
                            className={`
                                ${isDropdownOpen ? 'block' : 'hidden'}
                                z-10 
                                bg-white
                            `}
                        >
                            <ul className="
                                    py-2 
                                    text-bg 
                                    font-semibold 
                                    uppercase
                                    
                                "
                                aria-labelledby="dropdownMenuButton"
                            >
                                {listDistrict && listDistrict.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            className={`
                                                border-b-2 
                                                border-solid 
                                                block 
                                                py-2                                               
                                                w-80
                                                text-wrap
                                                text-left
                                                text-lg
                                                ${saveDistrict && saveDistrict.id.toString() === item.id.toString() ? "text-primary-blue-cus" : "text-gray-600"}
                                            `}
                                            onClick={() => {
                                                if (setSaveDistrict) setSaveDistrict(item)
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default FilterCus