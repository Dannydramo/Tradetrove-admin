export interface ProductProps {
    _id?: string;
    productName: string;
    description: string;
    category: string;
    price: number | string;
    inStock: boolean;
    images: string[];
}
