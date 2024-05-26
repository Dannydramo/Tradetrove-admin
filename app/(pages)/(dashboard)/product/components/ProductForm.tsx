'use client';
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { productValidationSchema } from '@/app/validators/product';
import { ProductProps } from '@/app/interface/product';
import { uploadImagesToCloudinary } from '@/app/services/upload';
import { toast } from 'sonner';
import { addProduct, editProduct } from '@/app/services/product';
import { useRouter } from 'next/navigation';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const ProductForm = ({
    initialValues,
    isEditing,
}: {
    initialValues?: ProductProps;
    isEditing: boolean;
}) => {
    const [product, setProduct] = useState<ProductProps>({
        productName: initialValues?.productName || '',
        description: initialValues?.description || '',
        category: initialValues?.category || '',
        price: initialValues?.price || '',
        inStock: initialValues?.inStock || true,
        images: initialValues?.images || [],
        _id: initialValues && initialValues?._id,
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [files, setFiles] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const onDrop = useCallback((acceptedFiles: (Blob | MediaSource)[]) => {
        if (acceptedFiles?.length) {
            setFiles((files: any[]) => [
                ...files,
                ...acceptedFiles.map((file: Blob | MediaSource) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
            ]);
        }
    }, []);
    const removeFile = (name: string) => {
        setFiles((files: File[]) =>
            files.filter((file: { name: string }) => file.name !== name)
        );
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 4,
        accept: {
            'image/*': [],
        },
    });

    const handleValueChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event: ChangeEvent<HTMLInputElement>) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value,
        });
    };

    const handleStockChange = (value: string) => {
        const newValue = value === 'true';

        setProduct((prevState) => ({
            ...prevState,
            inStock: newValue,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        productValidationSchema
            .validate(product, { abortEarly: false })
            .then(async () => {
                setErrors({});
                await submitProduct();
            })
            .catch((validationErrors) => {
                const errorsObj: { [key: string]: string } = {};
                validationErrors.inner.forEach(
                    (error: { path: string | number; message: string }) => {
                        errorsObj[error.path] = error.message;
                    }
                );
                setErrors(errorsObj);
            });
    };

    const submitProduct = async () => {
        try {
            setIsLoading(true);

            const updatedImages =
                files.length === 0
                    ? initialValues?.images || []
                    : await uploadImagesToCloudinary(files);

            const productToSubmit: ProductProps = {
                ...product,
                images: updatedImages,
            };

            const { status, message } = isEditing
                ? await editProduct(productToSubmit)
                : await addProduct(productToSubmit);

            if (status !== 200) {
                toast.error(message);
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            router.push('/products');
        } catch (error) {
            toast.error('Unable to process form submission');
            setIsLoading(false);
            return;
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="">
                        <Label className="mb-2 text-sm">Product Name</Label>
                        <Input
                            type="text"
                            name="productName"
                            placeholder="Product Name"
                            className="text-sm outline-none bg-transparent"
                            onChange={handleValueChange}
                            value={product.productName}
                        />
                        {errors.productName && (
                            <span className="text-red-500 text-sm">
                                {errors.productName}
                            </span>
                        )}
                    </div>
                    <div className="">
                        <Label className="mb-2 text-sm">Product Category</Label>
                        <Input
                            type="text"
                            name="category"
                            placeholder="Product Category"
                            className="text-sm outline-none bg-transparent"
                            onChange={handleValueChange}
                            value={product.category}
                        />
                        {errors.category && (
                            <span className="text-red-500 text-sm">
                                {errors.category}
                            </span>
                        )}
                    </div>
                    <div className="">
                        <Label className="mb-2 text-sm">Product Price</Label>
                        <Input
                            type="text"
                            name="price"
                            placeholder="Product Price"
                            className="text-sm outline-none bg-transparent"
                            onChange={handleValueChange}
                            value={product.price}
                        />
                        {errors.price && (
                            <span className="text-red-500 text-sm">
                                {errors.price}
                            </span>
                        )}
                    </div>
                    <div className="">
                        <Label className="mb-2 text-sm">Product In Stock</Label>
                        <Select
                            name="inStock"
                            value={product.inStock.toString()}
                            onValueChange={handleStockChange}
                            defaultValue={product.inStock.toString()}
                        >
                            <SelectTrigger className="w-full h-12">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">In Stock</SelectItem>
                                <SelectItem value="false">
                                    Out of Stock
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="mt-6">
                    <Label className="mb-2 text-sm">Product Description</Label>
                    <Textarea
                        placeholder="Enter Product Description"
                        value={product.description}
                        onChange={(e) => {
                            setProduct({
                                ...product,
                                description: e.target.value,
                            });
                        }}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-sm">
                            {errors.description}
                        </span>
                    )}
                </div>
                <div className="mt-6 w-full" {...getRootProps()}>
                    <label className="flex flex-col space-y-2">
                        <span>Add Product Images:</span>
                        <input {...getInputProps()} name="images" />
                        {isDragActive ? (
                            <p className="p-9 border-2 rounded-md w-full border-dashed border-slate-500 inline-block">
                                Drop the product image here...
                            </p>
                        ) : (
                            <p className="p-9 border-2 rounded-md border-dashed border-slate-500 inline-block">
                                Drag &apos;n&apos; product images here, or click
                                to select files
                            </p>
                        )}
                    </label>
                </div>

                <ul
                    className={` ${
                        files.length !== 0 ? 'border-2 p-2 mt-3 ' : ''
                    } flex gap-6 overflow-scroll`}
                >
                    {files?.map((file: any) => (
                        <li
                            key={file.name}
                            className="w-40 flex items-center p-2"
                        >
                            <Image
                                src={file.preview}
                                width={50}
                                height={50}
                                className="inline-block"
                                alt={`${file.name}`}
                                onLoad={() => {
                                    URL.revokeObjectURL(file.preview);
                                }}
                            />{' '}
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6 cursor-pointer text-red-700"
                                    onClick={() => removeFile(file.name)}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                </svg>
                            </div>
                            <div></div>
                        </li>
                    ))}
                </ul>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="my-4 w-full py-3 bg-[#4F80E1] text-white hover:bg-[#4F80E1] hover:text-white"
                >
                    {isLoading ? (
                        <svg
                            className="w-5 h-5 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </form>
        </>
    );
};

export default ProductForm;
