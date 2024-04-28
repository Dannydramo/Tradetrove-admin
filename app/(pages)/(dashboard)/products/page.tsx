'use client';
import Layout from '@/app/components/Layout';
import { ProductProps } from '@/app/interface/product';
import { getProductsByVendor } from '@/app/services/product';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import ProductCard from './ProductCard';
import ProductTable from './ProductTable';

const Products = () => {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const { status, message, data } = await getProductsByVendor();
                if (status !== 200) {
                    toast.error(message);
                    setLoading(false);
                    return;
                }
                setProducts(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching products', error);
                return;
            }
        };
        fetchProducts();
    }, []);
    return (
        <Layout>
            <section className="lg:col-span-1 px-6 mt-6">
                {loading ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <div className="text-center flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <p>No products found.</p>
                        <Link
                            href="/product/add-product"
                            className="bg-[#4F80E1] text-white px-6 py-3 rounded-md"
                        >
                            Add a product
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white p-4 rounded-lg mt-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                            <h2 className="font-bold">Products</h2>
                            <Link
                                href="/product/add-product"
                                className="bg-[#4F80E1] text-white  px-6 py-3 rounded-md"
                            >
                                Add a product
                            </Link>
                        </div>
                        <ProductTable products={products} />
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default Products;
