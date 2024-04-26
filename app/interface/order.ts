import { ProductProps } from './product';

interface User {
    _id: string;
    username: string;
    email: string;
    orders: any[]; // Define the type for orders if needed
    updated_at: string | null;
    created_at: string;
    __v: number;
}

interface ShippingAddress {
    city: string;
    country: string;
    line1: string;
    line2: string;
    postal_code: string;
    state: string;
}

export interface Order {
    _id: string;
    user: User;
    vendor: string;
    products: ProductProps[];
    shippingAddress: ShippingAddress;
    paymentStatus: string;
    totalPrice: number;
    createdAt: string;
    __v: number;
}
