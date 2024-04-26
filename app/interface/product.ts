export interface ProductProps {
    quantity: number;
    _id?: string;
    productName: string;
    description: string;
    category: string;
    price: number;
    inStock: boolean;
    images?: string[];
}
