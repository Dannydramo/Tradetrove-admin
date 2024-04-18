'use client';
import Layout from '@/app/components/Layout';
import { getProductDetails } from '@/app/services/product';
import React, { useEffect, useState } from 'react';
import ProductForm from '../../components/ProductForm';

const EditProduct = ({ params }: { params: { slug: string } }) => {
    const [productDetails, setProductDetails] = useState<any>();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const { status, message, data } = await getProductDetails(
                    params.slug
                );
                if (status !== 200) {
                    return;
                }

                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                return;
            }
        };
        fetchProductDetails();
    }, []);

    return (
        <Layout>
            <section className="lg:col-span-1 px-6 mt-6">
                <h1 className="text-center my-4 uppercase font-bold">
                    Edit {productDetails?.productName}
                </h1>

                <div className="bg-white rounded-md my-6 p-4 md:p-8">
                    {productDetails && (
                        <ProductForm
                            isEditing={true}
                            initialValues={productDetails}
                        />
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default EditProduct;
