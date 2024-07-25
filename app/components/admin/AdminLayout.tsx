"use client"

import { adminOptions } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientOnly from "../ClientOnly";
import NavAdmin from "./NavAdmin";
import AdminOverview from "./AdminOverview";
import AdminLogout from "./AdminLogout";
import { LayoutProps } from "@/types";

const AdminLayout: React.FC<LayoutProps> = ({
    children
}) => {
    const [selectedOption, setSelectedOption] = useState<number>(1)
    const router = useRouter()

    useEffect(() => {
        switch (router.pathname) {
            case '/admin/admin-home':
                setSelectedOption(1);
                break;
            case '/admin/user-management':
                setSelectedOption(2);
                break;
            case '/admin/post-management':
                setSelectedOption(3);
                break;
            case '/admin/report-management':
                setSelectedOption(4);
                break;
            case '/admin/rule-list':
                setSelectedOption(5);
                break;
            // case '/admin/user-report-management':
            //     setSelectedOption(6);
            //     break;            
            case '/admin/create-post':
                setSelectedOption(7)
                break;
            case '/admin/post-manager':
                setSelectedOption(8)
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
                router.push('/admin/admin-home');
                break;
            case 2:
                router.push('/admin/user-management');
                break;
            case 3:
                router.push('/admin/post-management');
                break;
            case 4:
                router.push('/admin/report-management');
                break;
            case 5:
                router.push('/admin/rule-list');
                break;
            // case 6:
            //     router.push('/admin/user-report-management');
            //     break;
            case 7:
                router.push('/admin/create-post');
                break;
            case 8:
                router.push('/admin/post-manager');
                break;
        }
    };

    return (
        <ClientOnly>
            <div className="relative bg-[#F7F7F7]">
                <NavAdmin />
                <div className="
                        relative 
                        gap-5
                        pt-5 
                        flex
                        flex-col
                        lg:grid 
                        lg:grid-cols-5 
                    "
                >
                    <div className="
                            lg:col-span-1 
                            lg:min-h-screen 
                            lg:max-h-full 
                            lg:flex 
                            lg:flex-col 
                            lg:gap-5 
                        "
                    >
                        <AdminOverview
                            options={adminOptions}
                            selectedOption={selectedOption}
                            onOptionSelect={handleOptionSelect}
                        />
                        <AdminLogout />
                    </div>
                    <div className="
                            lg:col-span-4 
                            min-h-screen 
                            max-h-full 
                            flex 
                            flex-col 
                            gap-5 
                            border 
                            border-black 
                            border-opacity-10 
                            bg-white rounded-xl
                        "
                    >
                        {children}
                    </div>
                </div>
            </div>
        </ClientOnly>
    )
}

export default AdminLayout