// eslint-disable-next-line import/named
import { IconType } from "react-icons/lib"

export interface ButtonProps {
    title: string | React.ReactNode
    style?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    icon?: Icon
    iconLeft?: Icon
    type?: "submit" | "reset"
    disabled?: boolean
    isHover?: boolean
    color?: string
    text?: string
}

export interface InputProps {
    id?: string
    icon?: React.ReactNode
    IconType?: IconType
    label?: string
    name?: string
    placeholder?: string
    value?: string | number
    defaultValue?: string | number
    type?: string
    disabled?: boolean
    register?: UseFormRegister<FieldValues>
    errors?: FieldErrors
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    colorInput?: string
    pattern?: RegExp
    flagInput?: boolean | false
    rowArea?: number
    maxLength?: number
    isMoney?: boolean | false
}

export interface FilterItem {
    id: string
    name: string
}

export interface FilterCusProps {
    title: string
    listItem: FilterItem[]
}

export interface linkItem {
    id: string
    label: string
    href?: string
}

export interface NavlinkItemProps {
    linkItems?: linkItem[]
}

export interface Option {
    id: number
    label: string
    icon: IconType
}
export interface OptionsOverviewProps {
    options: Option[]
    selectedOption: number
    onOptionSelect: (id: number) => void
}

export interface ListBank {
    data: {
        name: string
        shortName: string
        logo: string
    }[]
}