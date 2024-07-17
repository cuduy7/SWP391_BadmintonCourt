"use client"

import SwiperCore, { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import '@/styles/swiper-product.css'

import BlogItemOther from './BlogOther';
import { AxiosClient } from '@/services';
import useSWR from 'swr';
import { ListBlogs } from '@/types';
import Image from 'next/image';
import { LoadingFullScreen } from '../../loader';

SwiperCore.use([Pagination]);

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const BlogCarousel = () => {
    const { data: listBlog, isLoading, error } = useSWR<ListBlogs>(`/api/blogs/1`, fetcher, { refreshInterval: 10000 })

    if (isLoading) {
        return <LoadingFullScreen loading={isLoading} />
    }

    if (error) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold text-center">Đã xảy ra lỗi khi tải danh sách tin tức - error 500</p>
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

    if (listBlog && listBlog.data && listBlog.data.length === 0) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold text-center">Không có tin tức nào cả</p>
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

    const sliceItems = listBlog && listBlog.data ? listBlog.data.slice(0,8) : []

    return (
        <Swiper
            spaceBetween={10}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
                640: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                768: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                },
                1024: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
                1280: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                },
            }}
        >
            {sliceItems.map((item) => (
                <SwiperSlide key={item.id}>
                    <BlogItemOther
                        id={item.id}
                        title={item.title}
                        imgUrl={item.imgUrl}
                        createTime={item.createTime}
                        shortDescription={item.shortDescription}
                        summary={item.summary}
                        userCreateName={item.userCreateName}
                    />
                </SwiperSlide>
            ))}
            <div className="mt-20" />
        </Swiper>
    );
};

export default BlogCarousel
