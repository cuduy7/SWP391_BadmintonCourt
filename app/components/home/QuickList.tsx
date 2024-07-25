"use client"

import { Button, Container, LoadingFullScreen, ProductOther } from "../providers"
import { ListProduct } from "@/types"
import { AxiosClient } from "@/services"
import useSWR from 'swr'
import { useRouter } from "next/navigation"
import Image from "next/image"

const fetcher = (url: string) => AxiosClient.get(url).then(res => res.data)

const QuickList = () => {
    const router = useRouter()

    const { data: listProduct, error, isLoading } = useSWR<ListProduct>(`/api/posts/GetListPost`, fetcher, { refreshInterval: 5000 })

    if (isLoading) {
        return <LoadingFullScreen loading={isLoading} />
    }

    if (!listProduct) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold">Không tìm thấy danh sách sản phẩm</p>
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

    if (error) {
        return (
            <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                <p className="md:text-4xl text-3xl font-semibold">Đã xảy ra lỗi khi tải danh sách sản phẩm - error 500</p>
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

    const sliceItems = listProduct && listProduct.data.length > 0 ? listProduct.data.slice(0, 12) : []

    return (
        <div className="relative py-10">
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
                            Các Sân Mới Nhất
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
                {sliceItems.length === 0 ? (
                    <div className="relative flex flex-col space-x-3 items-center justify-center h-96 text-primary-blue-cus">
                        <p className="md:text-4xl text-3xl font-semibold">Không còn sân nào cả</p>
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
                ) : (
                    <>
                        <div className="
                                grid
                                xl:grid-cols-5
                                lg:grid-cols-3
                                md:grid-cols-2
                                grid-cols-1
                                gap-2
                                transition-all
                                duration-500
                            "
                        >
                            {sliceItems.map((items, index) => (
                                <ProductOther
                                    key={items.idPost || index}
                                    idPost={items.idPost}
                                    title={items.title}
                                    addressSlot={items.addressSlot}
                                    contentPost={items.contentPost}
                                    days={items.days}
                                    endTime={items.endTime}
                                    quantitySlot={items.quantitySlot}
                                    startTime={items.startTime}
                                    fullName={items.fullName}
                                    userImgUrl={items.userImgUrl}
                                    price={items.price}
                                    highlightUrl={items.highlightUrl}
                                    userId={items.userId}
                                />
                            ))}
                        </div>
                        <div className="relative flex justify-center items-center pt-16">
                            <Button
                                title="Xem thêm"
                                style="py-3 px-12 text-xl"
                                onClick={() => router.push("/product/list-product")}
                            />
                        </div>
                    </>
                )}
            </Container>
        </div>
    );
};

export default QuickList;
