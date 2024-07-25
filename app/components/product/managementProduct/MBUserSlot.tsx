import { Rating } from "../../providers"

const MPUserSlot = () => {
    return (
        <div className="relative grid grid-cols-4 gap-3">
            <div className="relative col-span-1">
                <div className="bg-[#DFEBFF] rounded-2xl h-96 flex flex-col justify-end">
                    <div className="relative bg-gradient-to-br from-linear-blue-cus-1 from-10% to-linear-blue-cus-2 to-90% transition-colors duration-500 backdrop-blur-sm h-80 rounded-2xl">
                        <div className="rounded-full w-24 h-24 bg-clip-border bg-gradient-to-br from-linear-blue-cus-1 from-10% to-linear-blue-cus-2 to-[305.11%] transition-colors duration-500 backdrop-blur-sm absolute -top-10 left-5 flex items-center justify-center">
                            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center text-4xl text-primary-blue-cus font-semibold">
                                01
                            </div>
                        </div>
                        <div className="h-20" />
                        <div className="flex flex-col gap-3 px-6 text-white">
                            <div className="text-xl  font-semibold">
                                Trần Thị Hà Linh
                            </div>
                            <div className="border-b-2 border-solid" />
                            <section className="flex space-x-1">
                                <label>
                                    Điện thoại:
                                </label>
                                <p className="font-semibold">
                                    0975168732
                                </p>
                            </section>
                            <section className="flex space-x-1">
                                <label>
                                    Giới tính:
                                </label>
                                <p className="font-semibold">
                                    Nữ
                                </p>
                            </section>
                            <section className="flex space-x-1">
                                <label>
                                    Cách chơi:
                                </label>
                                <p className="font-semibold">
                                    Tấn công
                                </p>
                            </section>
                            <section className="flex space-x-1">
                                <label>
                                    Trình độ:
                                </label>
                                <p className="font-semibold">
                                    Người mới chơi
                                </p>
                            </section>
                            <section className="flex space-x-1 items-center">
                                <label>
                                    Điểm đánh giá:
                                </label>
                                <div className="font-semibold">
                                    <Rating rating={4} maxStars={5} sizeCus={25} />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MPUserSlot