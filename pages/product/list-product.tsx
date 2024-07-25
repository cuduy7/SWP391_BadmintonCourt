import Layout from '@/app/layout';
import {
    Container,
    FilterCus,
    ProductItems
} from "@/app/components"

const ListBadmintonPage = () => {
    return (
        <Layout>
            <Container>
                <div className="py-10">
                    <div className="grid lg:grid-cols-4 col-span-1 gap-5">
                        <FilterCus />
                        <ProductItems />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default ListBadmintonPage