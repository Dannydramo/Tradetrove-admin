'use client';
import { getAllOrders } from '@/app/services/orders';
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table';
import { Order } from '@/app/interface/order';
import Image from 'next/image';

const OrderTable = () => {
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
        <Table className="text-xs">
            <TableCaption>A list of your orders.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>S/N</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Product Image</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Customer Address</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderData.map((order, index) => (
                    <TableRow key={order._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">
                            {order.user.username}
                        </TableCell>
                        <TableCell>
                            {order.products.map((product) => (
                                <div key={product._id}>
                                    {product.productName}
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>
                            {order.products.map((product: any) => (
                                <div className="bg-gray-200 p-2 rounded-sm w-fit">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.productName}
                                        height={50}
                                        width={50}
                                        className="h-[30px] w-[30px]"
                                    />
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>
                            {order.products.map((product) => (
                                <div key={product._id}>{product.price}</div>
                            ))}
                        </TableCell>
                        <TableCell>
                            {' '}
                            {order.products.map((product: any) => (
                                <div key={product._id}>
                                    {order.totalPrice / product.price}
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>
                            {order.shippingAddress.line1},
                            {order.shippingAddress.city},
                            {order.shippingAddress.state},
                        </TableCell>
                        <TableCell>{order.paymentStatus}</TableCell>
                        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter className="w-full">
                <TableRow>
                    <TableCell colSpan={8}>Total Order Amount</TableCell>

                    <TableCell>
                        $
                        {orderData
                            .reduce(
                                (total, order) => total + order.totalPrice,
                                0
                            )
                            .toFixed(2)}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default OrderTable;
