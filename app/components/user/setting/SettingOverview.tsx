import { OptionsOverviewProps } from "@/types";

const SettingOverview: React.FC<OptionsOverviewProps> = ({
    options,
    onOptionSelect,
    selectedOption
}) => {
    return (
        <div className="
                flex 
                lg:flex-col 
                lg:justify-normal 
                lg:p-4
                px-6 
                justify-between
                flex-row 
                py-4 
                gap-5
            "
        >
            <div className="text-gray-500 text-xl md:block hidden">
                Cài đặt
            </div>
            {options.map((option) => (
                <button
                    key={option.id}
                    className={`flex flex-row space-x-2 font-semibold text-gray-600 items-center cursor-pointer ${selectedOption === option.id ? 'text-primary-blue-cus font-semibold' : ''}`}
                    onClick={() => onOptionSelect(option.id)}
                >
                    <option.icon size={25} />
                    <span className="text-xl text-left sm:block hidden">{option.label}</span>
                </button>
            ))}
        </div>
    )
}

export default SettingOverview