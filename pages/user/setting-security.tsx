import { ModalChangePassword, SettingLayout, SettingSecurity } from "@/app/components"

const SettingSecurityPage = () => {
    return (
        <SettingLayout>
            <ModalChangePassword />
            <SettingSecurity />
        </SettingLayout>
    )
}

export default SettingSecurityPage