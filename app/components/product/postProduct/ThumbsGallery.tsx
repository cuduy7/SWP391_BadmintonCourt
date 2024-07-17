"use client"

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Thumbs } from 'swiper';
import { useDropzone } from 'react-dropzone';

import 'swiper/css';
import 'swiper/css/thumbs';
import Image from 'next/image';
import { FcAddImage } from 'react-icons/fc';

SwiperCore.use([Thumbs]);

const ThumbGallery = ({ setImages }: { setImages: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const maxSize = 2097152
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [showUploadButton, setShowUploadButton] = useState<boolean>(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop: (acceptedFiles) => {
            const newImages: string[] = [];
            acceptedFiles.forEach((file) => {
                if (file.size <= maxSize) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                            const base64data = reader.result;
                            newImages.push(base64data)
                            if (newImages.length === acceptedFiles.length) {
                                setUploadedImages(prevState => [...prevState, ...newImages])
                                setImages(prevState => [...prevState, ...newImages])
                            }
                        }
                    };
                    reader.readAsDataURL(file);
                } else {
                    //console.log('File quá lớn!');
                }
            });
        },
        multiple: true,
    })

    const handleThumbsSwiper = (swiper: SwiperCore) => {
        if (!thumbsSwiper) {
            setThumbsSwiper(swiper)
        }
    }

    const handleRemove = (index: number) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        setUploadedImages(newImages);
        setImages(newImages)
    }

    useEffect(() => {
        if (uploadedImages.length >= 4) {
            setShowUploadButton(false);
        } else {
            setShowUploadButton(true);
        }
    }, [uploadedImages.length])

    return (
        <div>
            <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                slidesPerView={1}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
                {uploadedImages.length > 0 ? (
                    uploadedImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="
                                    relative 
                                    transition-all
                                    pb-[70%] 
                                    duration-500
                                    cursor-pointer
                                "
                            >
                                <div className="
                                        absolute 
                                        top-0 
                                        left-0 
                                        w-full 
                                        h-full
                                        transition
                                        duration-300
                                    "
                                >
                                    <Image
                                        src={image}
                                        alt={`Image ${index}`}
                                        className="rounded-lg object-cover w-full h-full border border-black border-opacity-10"
                                        sizes="(max-width: 600px) 100vw, 600px"
                                        fill
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                ) : (
                    <div
                        {...getRootProps()}
                        className="
                            relative 
                            border-2 
                            border-dashed
                            h-96
                            rounded-xl
                            transition-all
                            duration-500
                            cursor-pointer
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-3
                            px-5
                        "
                    >
                        <input {...getInputProps()} />
                        <div className="relative w-20 h-20 flex justify-center items-center bg-[#F5FAFF] rounded-full">
                            <FcAddImage size={40} />
                        </div>
                        <div className="text-2xl whitespace-nowrap space-x-1 text-gray-600">
                            Thả hình ảnh của bạn ở đây
                        </div>
                        <p className="text-gray-500 text-xl text-center">Tải hình ảnh lên định dạng jpg, png dung lượng tối đa 2MB</p>
                    </div>
                )}
            </Swiper>

            <Swiper
                onSwiper={handleThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="pb-[70%]"
            >
                {uploadedImages.length > 0 && (
                    uploadedImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="pt-4">
                                <div className="
                                    relative 
                                    transition
                                    pb-[70%] 
                                    duration-300
                                    cursor-pointer
                                "
                                >
                                    <div className="
                                        absolute 
                                        top-0 
                                        left-0 
                                        w-full 
                                        h-full
                                        transition
                                        duration-300
                                    "
                                    >
                                        <Image
                                            src={image}
                                            alt={`Image ${index}`}
                                            className="rounded-lg object-cover w-full h-full border border-black border-opacity-10"
                                            sizes="(max-width: 600px) 100vw, 600px"
                                            fill
                                        />
                                        <button
                                            className="
                                                absolute 
                                                -top-2 
                                                right-0 
                                                rounded-full 
                                                text-2xl
                                                flex 
                                                items-center 
                                                justify-center 
                                                cursor-pointer
                                            "
                                            type="button"
                                            onClick={() => handleRemove(index)}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                )}
                {showUploadButton && (
                    <SwiperSlide>
                        <div
                            {...getRootProps()}
                            className="
                                relative 
                                pb-[70%]
                                rounded-xl
                                transition-all
                                duration-500
                                cursor-pointer
                                flex
                                flex-col
                                items-center
                                justify-center
                                mt-4
                            "
                        >
                            <input {...getInputProps()} />
                            <div className="
                                    absolute 
                                    top-0 
                                    left-0 
                                    w-full 
                                    h-full
                                    transition
                                    duration-300
                                "
                            >
                                <Image
                                    src="/images/more.png"
                                    alt="Add"
                                    className="rounded-lg object-contain w-full h-full"
                                    sizes="(max-width: 600px) 100vw, 600px"
                                    fill
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
};

export default ThumbGallery
