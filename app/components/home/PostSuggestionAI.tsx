"use client"

import SwiperCore, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import '@/styles/swiper-product.css'

import { Container, ProductOther } from '../providers'
import { useContext } from 'react'
import { GlobalContext } from '@/contexts'

SwiperCore.use([Pagination]);

const PostSuggestionAI = () => {
    const { AIListProduct } = useContext(GlobalContext) || {}

    return (
        AIListProduct && (
            <div className="relative py-10 transition-all">
                <Container>
                    <div className="flex flex-col mb-10">
                        <div className="
                                flex 
                                flex-row 
                                justify-between 
                                items-center
                                transition-all
                                duration-500
                            "
                        >
                            <div className="
                                    w-1/3 
                                    h-1 
                                    bg-primary-blue-cus
                                    hidden
                                    lg:block
                                "
                            />
                            <div className="
                                    text-gray-600 
                                    font-semibold
                                    lg:text-4xl
                                    text-3xl
                                    uppercase
                                    text-center
                                    transition-all
                                    duration-500
                                "
                            >
                                Gợi ý cho bạn
                            </div>
                            <div className="
                                    w-1/3 
                                    h-1 
                                    bg-primary-blue-cus
                                    hidden
                                    lg:block
                                "
                            />
                        </div>
                    </div>
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
                        {AIListProduct.map((item) => (
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
                </Container>
            </div>
        )
    )
}

export default PostSuggestionAI
