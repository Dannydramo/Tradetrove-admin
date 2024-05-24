'use client';
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

const OrderTable = ({ orderData }: { orderData: Order[] }) => {
    console.log(orderData);

    return (
        <>
            {orderData.length > 0 ? (
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
                        {orderData.map((order, orderIndex) =>
                            order.products.map((product, productIndex) => (
                                <TableRow key={`${order._id}-${product._id}`}>
                                    <TableCell>{orderIndex + 1}</TableCell>
                                    <TableCell className="font-medium">
                                        {order.user.username}
                                    </TableCell>
                                    <TableCell>{product.productName}</TableCell>
                                    <TableCell>
                                        <Image
                                            src={product.images[0]}
                                            alt={product.productName}
                                            width={50}
                                            height={50}
                                            className="w-[40px] h-[40px] rounded-full"
                                        />
                                    </TableCell>
                                    <TableCell> ₦{product.price}</TableCell>
                                    <TableCell>
                                        {order.totalPrice / +product.price}
                                    </TableCell>
                                    <TableCell>
                                        {order.shippingAddress.line1},
                                        {order.shippingAddress.city},
                                        {order.shippingAddress.state},
                                    </TableCell>
                                    {productIndex === 0 && (
                                        <>
                                            <TableCell
                                                rowSpan={order.products.length}
                                            >
                                                {order.paymentStatus}
                                            </TableCell>
                                            <TableCell
                                                rowSpan={order.products.length}
                                            >
                                                ₦{order.totalPrice.toFixed(2)}
                                            </TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                    <TableFooter className="w-full">
                        <TableRow>
                            <TableCell colSpan={8}>
                                Total Order Amount
                            </TableCell>

                            <TableCell>
                                ₦
                                {orderData
                                    .reduce(
                                        (total, order) =>
                                            total + order.totalPrice,
                                        0
                                    )
                                    .toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            ) : (
                <>
                    <div className="px-6 w-full">
                        <div className="text-center mx-auto mt-12 h-full flex flex-col justify-center items-center">
                            <Image
                                src="/empty-state.svg"
                                alt="Empty State"
                                width={100}
                                height={100}
                                className="mx-auto block my-4"
                            />
                            <p>Your order history is waiting to be filled.</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default OrderTable;
