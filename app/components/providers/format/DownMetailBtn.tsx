import { HiDownload } from "react-icons/hi"

interface DownMetalBtnProps {
    onClick: () => void
}

const DownMetalBtn: React.FC<DownMetalBtnProps> = ({onClick}) => {
    return (
        <button className="flex flex-shrink-0 space-x-1 items-center text-primary-blue-cus font-medium md:text-xl text-lg" onClick={onClick}>
            <HiDownload />
            <span>
                Tải dữ liệu xuống
            </span>
        </button>
    )
}

export default DownMetalBtn