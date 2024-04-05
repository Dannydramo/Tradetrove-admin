import Layout from '@/app/components/Layout';
import React from 'react';
import ProductForm from '../components/ProductForm';

const AddProduct = () => {
    return (
        <Layout>
            <section className="lg:col-span-1 px-6 mt-6">
                Add Products Page
                <div className="bg-white rounded-md my-6 p-4 md:p-8">
                    <ProductForm isEditing={false} />
                </div>
            </section>
        </Layout>
    );
};

export default AddProduct;
