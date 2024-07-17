'use client'

import { LayoutProps } from "@/types"
import { useEffect, useState } from "react"

const ClientOnly: React.FC<LayoutProps> = ({
    children
}) => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly