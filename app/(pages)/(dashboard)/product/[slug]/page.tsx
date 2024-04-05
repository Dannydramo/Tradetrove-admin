'use client';
import Layout from '@/app/components/Layout';
import { getProductDetails } from '@/app/services/product';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Link from 'next/link';

const Page = ({ params }: { params: { slug: string } }) => {
    const [productDetails, setProductDetails] = useState<any>();
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { status, message, data } = await getProductDetails(
                    params.slug
                );
                if (status !== 200) {
                    toast.error(message);
                    return;
                }

                toast.success(message);
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                toast.error('Error fetching product details');
            }
        };
        fetchProductDetails();
    }, []);

    return (
        <Layout>
            <section className="lg:col-span-1 px-6 mt-6">
                <div className="flex flex-col md:flex-row gap-8 justify-between">
                    <Carousel
                        plugins={[plugin.current]}
                        className="w-full md:w-1/2 lg:h-[50vh]"
                        onMouseEnter={plugin.current.stop}
                        onMouseLeave={plugin.current.reset}
                    >
                        <CarouselContent>
                            {productDetails?.images.map(
                                (image: string, index: number) => (
                                    <CarouselItem key={index}>
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center">
                                                    <img
                                                        src={image}
                                                        alt={`Product Image ${index}`}
                                                        className="h-full w-full"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                    </Carousel>

                    <div className="md:w-1/2">
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
                        <p>
                            {productDetails?.inStock &&
                            productDetails.inStock === true
                                ? 'In Stock'
                                : 'Out Of Stock'}
                        </p>
                        <Link
                            href={`/product/${productDetails?._id}/edit-product`}
                            className="bg-[#4F80E1] text-white px-6 py-3 rounded-md my-4"
                        >
                            Edit Product
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Page;
