"use client"

import { useState } from "react";
import { TbBellRinging2Filled } from "react-icons/tb"
import { Button, ToggleSwitch } from "../../providers"

const SettingNotify = () => {
    const [isToggle1, setToggle1] = useState(false);
    const [isToggle2, setToggle2] = useState(false);


    const listNotify = [
        { id: 1, label: "Bạn đã đổi mật khẩu thành công" },
        { id: 2, label: "Bạn đã đổi email thành công" },
        { id: 3, label: "Bạn đã đổi avatar thành công" },
        { id: 4, label: "Bạn đã đổi mật khẩu thành công" },
        { id: 5, label: "Bạn đã đổi mật khẩu thành công" },
    ]

    const listSwitch = [
        { id: 1, label: "Nhận thông tin mới nhất từ chúng tôi", toggle: isToggle1, setToggle: setToggle1},
        { id: 2, label: "Nhận thông tin khuyến mãi", toggle: isToggle2, setToggle: setToggle2 },
    ]

    return (
        <div className="relative p-8 flex flex-col gap-5 h-screen">
            <div className="text-gray-600 text-2xl md:text-3xl font-semibold">Thông báo</div>
            <div className="border border-black border-opacity-10" />
            <div className="flex flex-col gap-3 pb-10">
                {listNotify.map((items) => (
                    <div className="flex flex-row space-x-2 items-center" key={items.id}>
                        <TbBellRinging2Filled size={20} />
                        <div className="text-xl text-[#505050]">
                            {items.label}
                        </div>
                    </div>
                ))}
            </div>
            <div className="border border-black border-opacity-10" />
            {listSwitch.map((items) => (
                <div className="flex flex-row justify-between items-center" key={items.id}>
                    <div className="text-gray-600 text-xl font-semibold">
                        {items.label}
                    </div>
                    <ToggleSwitch
                        isChecked={items.toggle}
                        onChange={items.setToggle}
                    />
                </div>
            ))}
            <div className="relative ml-auto py-5">
                <Button
                    title="Áp dụng"
                    style="md:text-xl md:py-2 px-10"
                    onClick={() => { }}
                />
            </div>
        </div>
    )
}

export default SettingNotify