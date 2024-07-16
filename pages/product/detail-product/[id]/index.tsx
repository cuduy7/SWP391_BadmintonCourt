import Layout from '@/app/layout';
import {
    Container,
    ProductContent,
    ProductUserPost,
    ProductOtherExtra,
    ModalFailPayment,
    ModalSuccessPayment,
    ModalReportPost,
    ModalContinuePayment
} from "@/app/components";
import { getListProductService, getProductService } from "@/services/product";
import { ProductDetailContent, ProductDetailContentData } from "@/types";
import { GetStaticPaths, GetStaticProps } from "next";
import Custom500 from '@/pages/500';
import Custom404 from '@/pages/404';

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await getListProductService()
    const paths = products.data.map((product: ProductDetailContentData) => ({
        params: { id: product?.idPost?.toString() },
    }));

    return { paths, fallback: true }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id

    if (!id || Array.isArray(id)) {
        return {
            notFound: true,
        }
    }

    try {
        const Product = await getProductService(id)
        if (Product.data == null) {
            return {
                notFound: true
            }
        }

        return {
            props: {
                Product,
                postId: id.toString()
            },
            revalidate: 5
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

const DetailBadmintonPage = ({ Product, internalError, postId }: { Product: ProductDetailContent, internalError?: boolean, postId: string }) => {
    if (!Product) {
        return <Custom404 />
    }

    if (internalError) {
        return <Custom500 />
    }

    return (
        <Layout>
            <ModalContinuePayment />
            <ModalFailPayment />
            <ModalSuccessPayment />
            <ModalReportPost id={postId} />
            <Container>
                <ProductContent
                    id={postId}
                    imageUrls={Product.data.imageUrls}
                    addressSlot={Product.data.addressSlot}
                    categorySlot={Product.data.categorySlot}
                    levelSlot={Product.data.levelSlot}
                    postSlot={Product.data.postSlot}
                    title={Product.data.title}
                    price={Product.data.price}
                    userId={Product.data.userId}
                />
                <ProductUserPost
                    id={postId}
                    title={Product.data.title}
                    contentPost={Product.data.contentPost}
                    imgUrlUser={Product.data.imgUrlUser}
                    sortProfile={Product.data.sortProfile}
                    fullName={Product.data.fullName}
                    totalRate={Product.data.totalRate}
                    userId={Product.data.userId}
                    price={Product.data.price}
                />
                <ProductOtherExtra id={postId}/>
            </Container>
        </Layout>
    )
}

export default DetailBadmintonPage;
