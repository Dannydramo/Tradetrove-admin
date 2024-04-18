'use client';
import Layout from '@/app/components/Layout';
import { getProductDetails } from '@/app/services/product';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import Image from 'next/image';

const Page = ({ params }: { params: { slug: string } }) => {
    const [productDetails, setProductDetails] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setIsLoading(true);
            try {
                const { status, message, data } = await getProductDetails(
                    params.slug
                );
                if (status !== 200) {
                    toast.error(message);
                    setIsLoading(false);
                    return;
                }
                setProductDetails(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching product details:', error);
                toast.error('Error fetching product details');
                setIsLoading(false);
            }
        };
        fetchProductDetails();
    }, []);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    return (
        <Layout>
            <section className="lg:col-span-1 px-6 mt-6">
                <div className="flex flex-col md:flex-row gap-8 md:justify-between py-4">
                    {isLoading ? (
                        <>
                            <div className="w-full md:w-1/2 lg:h-[60vh]">
                                <Skeleton className="w-full h-full bg-slate-200 rounded-md" />
                            </div>
                            <div className="">y</div>
                        </>
                    ) : (
                        <>
                            {productDetails && (
                                <>
                                    <div className="w-full md:w-1/2">
                                        <div className="h-[65vh]">
                                            <Image
                                                src={
                                                    productDetails?.images[
                                                        selectedImageIndex
                                                    ]
                                                }
                                                alt=""
                                                width={500}
                                                height={500}
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <div className="flex space-x-4 mt-6">
                                            {productDetails?.images.map(
                                                (
                                                    image: string,
                                                    index: number
                                                ) => (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            handleImageClick(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={`h-[70px] w-[70px] sm:h-[100px] sm:w-[100px] rounded-xl border ${
                                                                selectedImageIndex ===
                                                                index
                                                                    ? 'border-blue-500'
                                                                    : ''
                                                            }`}
                                                        >
                                                            <Image
                                                                src={image}
                                                                height={500}
                                                                width={500}
                                                                className="h-full w-full"
                                                                alt={`Product Image ${index}`}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2 mt-6">
                                        <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">
                                            {productDetails?.productName}
                                        </h1>
                                        <p className="my-4 text-sm sm:text-base">
                                            {productDetails?.description}
                                        </p>
                                        <p className="my-4 text-sm sm:text-base">
                                            {productDetails?.category}
                                        </p>
                                        <p className="text-xl font-semibold">
                                            {' '}
                                            ₦{productDetails?.price}
                                        </p>
                                        <p
                                            className={`my-6 w-fit sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide uppercase  rounded-full text-white ${
                                                productDetails?.inStock === true
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                            }`}
                                        >
                                            {productDetails?.inStock &&
                                            productDetails.inStock === true
                                                ? 'In Stock'
                                                : 'Out Of Stock'}
                                        </p>
                                        <Link
                                            href={`/product/${productDetails?._id}/edit-product`}
                                            className="bg-[#4F80E1] text-white px-6 py-3 rounded-md mt-8"
                                        >
                                            Edit Product
                                        </Link>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Page;
