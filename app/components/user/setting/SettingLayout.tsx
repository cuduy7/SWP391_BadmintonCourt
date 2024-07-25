"use client"

import React, { useEffect, useState } from "react";
import { Container } from "@/app/components";
import Layout from "@/app/layout";
import { settingOptions } from "@/utils";
import { LayoutProps } from "@/types";
import { useRouter } from "next/router";
import SettingOverview from "./SettingOverview";

const SettingLayout: React.FC<LayoutProps> = ({
    children
}) => {
    const [selectedOption, setSelectedOption] = useState<number>(1);

    const router = useRouter()

    useEffect(() => {
        switch (router.pathname) {
            case '/user/setting-profile':
                setSelectedOption(1);
                break;
            case '/user/setting-security':
                setSelectedOption(2);
                break;
            case '/user/setting-ban':
                setSelectedOption(3);
                break;
            case '/user/setting-notify':
                setSelectedOption(4);
                break;
            default:
                setSelectedOption(0);
                break;
        }
    }, [router.pathname]);

    const handleOptionSelect = (id: number) => {
        setSelectedOption(id)
        switch (id) {
            case 1:
                router.push('/user/setting-profile');
                break;
            case 2:
                router.push('/user/setting-security');
                break;
            case 3:
                router.push('/user/setting-ban');
                break;
            case 4:
                router.push('/user/setting-notify');
                break;
        }
    };

    return (
        <Layout>
            <Container>
                <div className="relative py-5">
                    <div className="
                            flex
                            flex-col
                            lg:grid 
                            lg:grid-cols-8 
                            lg:h-full 
                            lg:min-h-screen 
                            gap-5
                        "
                    >
                        <div className="
                                border-2 
                                h-full 
                                border-[#E7EBEE] 
                                rounded-xl 
                                lg:col-span-2 
                                lg:block
                            "
                        >
                            <SettingOverview
                                options={settingOptions}
                                selectedOption={selectedOption}
                                onOptionSelect={handleOptionSelect}
                            />
                        </div>
                        <div className="lg:col-span-6 border-2 h-full border-[#E7EBEE] rounded-xl">
                            {children}
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default SettingLayout;
