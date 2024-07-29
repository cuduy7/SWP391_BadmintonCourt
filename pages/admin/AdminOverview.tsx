"use client"

import { GlobalContext } from "@/contexts";
import { OptionsOverviewProps } from "@/types"
import { customStyles } from "@/utils";
import { useContext } from "react";
import Select from 'react-select'

const AdminOverview: React.FC<OptionsOverviewProps> = ({
    options,
    onOptionSelect,
    selectedOption
}) => {
    const selectOptions = options.map(option => ({
        value: option.id,
        label: option.label,
        icon: option.icon,
    }))

    const handleChange = (selectedOption: any) => {
        onOptionSelect(selectedOption.value);
    }

    const { user } = useContext(GlobalContext) || {}

    return (
        <div className="
                flex 
                flex-col 
                border 
                border-black 
                border-opacity-10 
                rounded-r-xl 
                bg-white 
                px-6 
                h-full
                gap-5
                py-5
                lg:py-10 
                lg:gap-10 
            "
        >
            <div className="
                    relative
                    flex
                    flex-row
                    justify-between
                    items-center
                    lg:flex-col 
                    lg:justify-normal
                    lg:items-baseline
                "
            >
                <div className="text-gray-600 font-semibold text-2xl">
                    {user && user.fullName}
                </div>
                <div className="text-xl font-semibold italic text-gray-500">
                    {user && user.role}
                </div>
            </div>
            <div className="border-b border-black border-opacity-10" />
            <div className="
                    lg:flex
                    lg:flex-col
                    lg:gap-10
                    hidden
                "
            >
                {options.map((option) => (
                    <button className={`
                            relative 
                            flex 
                            flex-row 
                            items-center 
                            space-x-2 
                            cursor-pointer 
                            hover:text-primary-blue-cus 
                            text-gray-600
                            ${selectedOption === option.id ? 'text-primary-blue-cus font-semibold' : ''}
                        `}
                        key={option.id}
                        onClick={() => onOptionSelect(option.id)}
                    >
                        <div className="flex-shrink-0">
                            <option.icon size={24} />
                        </div>
                        <p className="text-lg font-medium text-left">
                            {option.label}
                        </p>
                    </button>
                ))}
            </div>
            <div className="lg:hidden block">
                <Select
                    options={selectOptions}
                    onChange={handleChange}
                    isSearchable={false}
                    value={selectOptions.find(option => option.value === selectedOption)}
                    styles={customStyles}
                />
            </div>
        </div>
    )
}

export default AdminOverview