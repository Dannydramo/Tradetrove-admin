'use client';
import OrderTable from '@/app/(pages)/(dashboard)/orders/OrderTable';
import { Order } from '@/app/interface/order';
import { getRecentOrders } from '@/app/services/orders';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LatestOrders = () => {
    const [orderData, setOrderData] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { status, message, data } = await getRecentOrders();
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
        <div className="bg-white p-4 rounded-md my-4">
            <div className="my-4 flex justify-between items-center">
                <h1 className="font-bold">Recent Orders</h1>
                <Link
                    href={'/orders'}
                    className="text-sm bg-[#4F80E1] text-white px-6 py-3 rounded-md"
                >
                    View All Orders
                </Link>
            </div>
            <OrderTable orderData={orderData} />
        </div>
    );
};

export default LatestOrders;
