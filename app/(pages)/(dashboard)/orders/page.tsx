import Layout from '@/app/components/Layout';
import React from 'react';
import OrderTable from './OrderTable';

const Orders = () => {
    return (
        <Layout>
            <section className="lg:col-span-1 px-4 sm:px-6 mt-6">
                <OrderTable />
            </section>
        </Layout>
    );
};

export default Orders;
