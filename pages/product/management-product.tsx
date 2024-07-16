import { Container, MPItems, ModalAdminDeletePost, ModalBoostProduct, ModalRoomByProduct } from "@/app/components"
import Layout from "@/app/layout"

const ManagementBadmintonPage = () => {
    return (
        <Layout>
            <ModalRoomByProduct />
            <ModalBoostProduct />
            <ModalAdminDeletePost user_id={null} />
            <Container>
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
            </Container>
        </Layout>
    )
}

export default ManagementBadmintonPage