import { ProductProps } from '@/app/interface/product';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }: { product: ProductProps }) => {
    return (
        <Link href={`/product/${product._id}`}>
            <Card>
                <div className="relative group">
                    <div className="overflow-hidden aspect-w-1 aspect-h-1">
                        {product.images && product.images.length > 0 && (
                            <img
                                className="object-fit w-full h-[300px] transition-all duration-300 group-hover:scale-125"
                                src={product.images[0]}
                                alt=""
                            />
                        )}
                    </div>

                    <div className="flex items-start justify-between mt-4 space-x-4">
                        <div>
                            <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                {' '}
                                {product.productName}
                            </h3>
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                ₦ {product.price}
                            </p>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default ProductCard;
