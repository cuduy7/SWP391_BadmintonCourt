import { Container } from '@/app/components'
import Layout from '@/app/layout'
import Image from 'next/image';

export default function Custom500() {
    return (
        <Layout>
            <Container>
                <div className="relative h-screen flex flex-col items-center justify-center gap-5 text-primary-blue-cus font-semibold">
                    <div className="flex space-x-3 items-center flex-wrap justify-center transition-all duration-500">
                        <h1 className="md:text-5xl text-3xl transition-all duration-500">500 - Lỗi máy chủ</h1>
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
                    <p className="md:text-3xl text-xl text-center transition-all duration-500">Xin lỗi, có lỗi xảy ra từ phía máy chủ. Vui lòng thử lại sau.</p>
                </div>
            </Container>
        </Layout>
    );
}
