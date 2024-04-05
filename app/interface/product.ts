export interface ProductProps {
    _id?: string;
    productName: string;
    description: string;
    category: string;
    price: string;
    inStock: boolean;
    images?: string[];
}
