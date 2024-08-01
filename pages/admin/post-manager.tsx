import { AdminLayout, MPItems, ModalAdminDeletePost, ModalRoomByProduct } from "@/app/components";
import ModalManagement from "@/app/components/providers/modal/product/ModalManagement";
import ModalUpdateProduct from "@/app/components/providers/modal/product/ModalUpdateProduct";

export default function PostManager() {
    return (
        <AdminLayout>
            <ModalRoomByProduct />
            <ModalManagement />
            <ModalUpdateProduct />
            <ModalAdminDeletePost user_id={null} />
            <div className="relative">
                <div className="flex justify-center py-10">
                    <h1 className="text-gray-600 font-semibold md:text-4xl text-3xl">
                        Quản lý sân
                    </h1>
                </div>
                <div className="relative w-full flex flex-col gap-3">
                    <MPItems />
                    {/* <MPUserSlot /> */}
                </div>
            </div>
        </AdminLayout>
    );
}
