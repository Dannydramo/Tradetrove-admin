'use client';
import Layout from '@/app/components/Layout';
import React, { useEffect, useState } from 'react';
import OrderTable from './OrderTable';
import { Order } from '@/app/interface/order';
import { getAllOrders } from '@/app/services/orders';

const Orders = () => {
    const [orderData, setOrderData] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { status, message, data } = await getAllOrders();
                if (status !== 200) {
                    console.log(message);
                    return;
                }
                setOrderData(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, []);
    return (
        <Layout>
            <section className="lg:col-span-1 px-4 sm:px-6 mt-6">
                <OrderTable orderData={orderData} />
            </section>
        </Layout>
    );
};

export default Orders;
