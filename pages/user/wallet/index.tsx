import { Container, ModalRecharge, ModalWithdraw } from '@/app/components';
import { WalletHistory, WalletOverview } from '@/app/components/user/wallet';
import Layout from '@/app/layout';

const WalletPage = () => {
    return (
        <Layout>
            <ModalWithdraw />
            <ModalRecharge />
            <Container>
                <div className="relative md:py-10 py-5">
                    <div className="flex flex-col md:gap-10 gap-5">
                        <WalletOverview />
                        <WalletHistory />
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

export default WalletPage