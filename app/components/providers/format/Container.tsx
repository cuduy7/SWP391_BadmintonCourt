import { LayoutProps } from "@/types"

const Container: React.FC<LayoutProps> = ({
    children
}) => {
    return (
        <div
            className="
                max-w-[2520px]
                xl:px-24
                lg:px-16
                md:px-10
                py-5
                px-4
                transition-all
                duration-500
            "
        >
            {children}
        </div>
    )
}

export default Container