"use client"

import Image from "next/image"
import { listMethodsPayment } from "@/utils"
import { useState } from "react"

interface FormatMethodProps {
    id: string
    src: string
    title: string
    number: number
    isChecked: boolean
    onChange: (isChecked: string) => void
}

interface CheckedProps {
    onCheckedChange: (isChecked: boolean) => void
}

const FormatMethod: React.FC<FormatMethodProps> = ({
    id,
    src,
    title,
    number,
    isChecked,
    onChange
}) => {
    return (
        <div className="flex flex-row items-center gap-3 transition-all duration-500" key={id}>
            <div className="relative">
                <Image
                    src={src}
                    alt="payment"
                    height={60}
                    width={60}
                    className="object-contain w-14 h-10"
                />
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-lg text-gray-600 font-semibold">
                    {title}
                </div>
                <div className="text-lg text-gray-500 font-normal">
                    *0{number}
                </div>
            </div>
            <input
                type="radio"
                className="
                    border-2
                    border-black
                    border-opacity-10
                    appearance-none 
                    h-5 
                    w-5 
                    checked:text-primary-blue-cus
                    focus:ring-0 
                    cursor-pointer
                "
                checked={isChecked}
                onChange={() => onChange(id)}
            />
        </div>
    )
}

const ProductMethod: React.FC<CheckedProps> = ({ onCheckedChange }) => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>("2");
    const handleMethodChange = (methodId: string) => {
        setSelectedMethod(methodId)
        const isChecked = methodId === "1"
        onCheckedChange(isChecked)
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="text-lg text-gray-600 font-semibold">
                Phương Thức Thanh Toán
            </div>
            <div className="flex flex-row space-x-5">
                {listMethodsPayment.map((item) => (
                    <FormatMethod
                        key={item.id}
                        id={item.id}
                        src={item.src}
                        title={item.title}
                        number={item.number}
                        isChecked={item.id === selectedMethod}
                        onChange={handleMethodChange}
                    />
                ))}
            </div>
        </div>
    )
}
export default ProductMethod
