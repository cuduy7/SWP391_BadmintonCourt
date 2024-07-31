import { Container, ModalDeleteTransaction, TransactionDetail, TransactionExtra } from '@/app/components'
import Layout from '@/app/layout'
import Custom500 from '@/pages/500'
import { getTransactionDetailService } from '@/services'
import { TransactionPaymentDetail } from '@/types'
import Image from 'next/image'

export async function getServerSideProps(context: any) {
    const id = context.params?.id

    if (!id || Array.isArray(id)) {
        return {
            notFound: true,
        }
    }

    try {
        const transaction = await getTransactionDetailService(id)

        return {
            props: {
                transaction,
                tran_id: id.toString()
            },
        }
    } catch (error) {
        //console.log(error)
        return {
            props: {
                internalError: true
            }
        }
    }
}

const TransactionDetailPage = ({ transaction, tran_id, internalError }: { transaction: TransactionPaymentDetail, tran_id: string, internalError?: boolean }) => {
    if (internalError) {
        return <Custom500 />
    }

    return (
        <Layout>
            {/* <ModalRating /> */}
            <ModalDeleteTransaction />
            {/* <ModalTransaction tran_id={tran_id} creator={transaction.data.post.createUser} userId={transaction.data.post.userId}/> */}
            <Container>
                <div className="relative py-10">
                    {transaction.data.post == null ? (
                        <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                            <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                                <h1 className="md:text-4xl text-3xl transition-all duration-500 text-center">Hóa đơn này không tồn tại!</h1>
                                <div className="relative">
                                    <Image
                                        src="/images/sad.gif"
                                        alt="Gif"
                                        width={100}
                                        height={100}
                                        className="object-contain md:w-32 md:h-32 h-20 w-20 transition-all duration-500"
                                    />
                                </div>
                            </div>
                            <p className="md:text-3xl text-xl text-center transition-all duration-500">Vui lòng thực hiện thanh toán để có hóa đơn</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <div className="flex items-center justify-center md:text-4xl text-3xl text-gray-600 font-semibold pb-10">
                                Chi tiết thanh toán
                            </div>
                            <div className="md:grid md:grid-cols-12 flex flex-col gap-3 text-gray-600">
                                <TransactionDetail
                                    id={tran_id}
                                    slotCount={transaction.data.slotCount}
                                    slots={transaction.data.slots}
                                    buyerName={transaction.data.buyerName}
                                    payTime={transaction.data.payTime}
                                    post={transaction.data.post}
                                    cancelHour={transaction.data.cancelHour}
                                />
                                <TransactionExtra
                                    id={tran_id}
                                    total={transaction.data.total}
                                    isCancel={transaction.data.isCancel}
                                    tranStatus={transaction.data.tranStatus}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Container>
        </Layout>
    )
}

export default TransactionDetailPage