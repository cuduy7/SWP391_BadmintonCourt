"use client"

import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import '@/styles/swiper-product.css'

import ProductOther from './ProductOther'
import { ListProduct, ListProductData } from '@/types'
import { AxiosClient } from '@/services'
import useSWR from 'swr'
import { LoadingFullScreen } from '../../loader'
import Image from 'next/image'

SwiperCore.use([Pagination]);

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const ProductCarousel = ({ id }: { id: string }) => {
    const { data: listProduct, error } = useSWR<ListProduct>('/api/posts/GetListPost', fetcher)

    const isLoading = !error && !listProduct

    if (isLoading) {
        return <LoadingFullScreen loading={isLoading} />
    }

    if (error) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold text-center">Đã xảy ra lỗi khi tải danh sách sản phẩm - error 500</p>
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
        )
    }

    if (listProduct && listProduct.data && listProduct.data.length === 0) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold text-center">Không có sân nào cả</p>
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
        )
    }

    let filteredListProduct: ListProductData[] = []

    if (id && listProduct && listProduct.data) {
        filteredListProduct = listProduct.data.filter(products => products.idPost?.toString() !== id.toString())
    } else {
        filteredListProduct = listProduct ? listProduct.data : []
    }

    const slicedItems = filteredListProduct && filteredListProduct.length > 0 ? filteredListProduct.slice(0, 16) : []

    if (slicedItems.length === 0) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold text-center">Không có sân nào cả</p>
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
        )
    }

    return (
        <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                768: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                },
                1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                },
            }}
        >
            {slicedItems.map((item) => (
                <SwiperSlide key={item.idPost}>
                    <ProductOther
                        idPost={item.idPost}
                        title={item.title}
                        addressSlot={item.addressSlot}
                        contentPost={item.contentPost}
                        days={item.days}
                        startTime={item.startTime}
                        endTime={item.endTime}
                        quantitySlot={item.quantitySlot}
                        price={item.price}
                        highlightUrl={item.highlightUrl}
                        fullName={item.fullName}
                        userImgUrl={item.userImgUrl}
                    />
                </SwiperSlide>
            ))}
            <div className="mt-20" />
        </Swiper>
    );
};

export default ProductCarousel
