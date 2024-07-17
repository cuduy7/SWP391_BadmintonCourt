export interface FormatDateProps {
    dateString: string
}

export interface FormatTimeProps {
    timeString: string
}

export interface BackgroundProps {
    src: string
    children: React.ReactNode
}

export interface LayoutProps {
    children: React.ReactNode
}

export interface FormatUIProps {
    src: string
    title?: string
    subTitle?: string
    body: React.ReactElement
    subBody?: React.ReactElement
    footer?: React.ReactElement
}

export interface QuickBannerTitle {
    title: string
    subTitle: string
}

export interface DateSlot {
    date: string,
    slot: number
}

export interface Time {
    hour: string
    minute: string
}
