import { ProductProps } from '@/app/interface/product';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

import Image from 'next/image';
import Link from 'next/link';
import { deleteProductById, getProductsByVendor } from '@/app/services/product';
import { toast } from 'sonner';

const ProductTable = ({ products }: { products: ProductProps[] }) => {
    const deleteProduct = async (productId: string) => {
        try {
            const { status, message } = await deleteProductById(productId);
            if (status !== 200) {
                toast.error(message);
                return;
            }
            toast.success(message);
            getProductsByVendor();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Table className="mt-8 text-sm">
            <TableCaption>A list of all your products.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="flex">
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 mr-[-10px]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                                />
                            </svg>
                        </span>
                        <span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                                />
                            </svg>
                        </span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product: ProductProps) => (
                    <TableRow key={product._id}>
                        <TableCell>
                            {product.images && (
                                <div className="bg-gray-200 p-2 rounded-sm w-fit">
                                    <Image
                                        src={product?.images[0]}
                                        alt={product.productName}
                                        height={50}
                                        width={50}
                                        className="h-[30px] w-[30px]"
                                    />
                                </div>
                            )}
                        </TableCell>
                        <TableCell className="">
                            {product.productName}
                        </TableCell>
                        <TableCell> ₦ {product.price}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>
                            {' '}
                            {product.inStock === true
                                ? 'In stock'
                                : 'Out of stock'}
                        </TableCell>
                        <TableCell className="flex justify-end">
                            <Popover>
                                <PopoverTrigger>
                                    <span className="">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 cursor-pointer"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                            />
                                        </svg>
                                    </span>
                                </PopoverTrigger>
                                <PopoverContent className="max-w-32 text-sm flex flex-col space-y-4 mr-8">
                                    <Link
                                        href={`/product/${product._id}/edit-product`}
                                        className=""
                                    >
                                        Edit
                                    </Link>
                                    <Link href={`/product/${product._id}`}>
                                        View
                                    </Link>
                                    <p
                                        className="cursor-pointer"
                                        onClick={() =>
                                            deleteProduct(product._id!)
                                        }
                                    >
                                        Delete
                                    </p>
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProductTable;
