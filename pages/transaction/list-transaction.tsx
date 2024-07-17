import { Container, ModalReportTransaction, TransactionItems } from '@/app/components'
import Layout from '@/app/layout'

const TransactionDetailPage = () => {
    return (
        <Layout>
            <ModalReportTransaction />
            <Container>
                <div className="relative py-10">
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center md:text-4xl text-3xl text-gray-600 font-semibold pb-10">
                            Các đơn hàng của bạn
                        </div>
                        <TransactionItems />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default TransactionDetailPage