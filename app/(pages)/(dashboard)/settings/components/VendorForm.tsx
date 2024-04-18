'use client';
import React, {
    ChangeEvent,
    ChangeEventHandler,
    useCallback,
    useState,
} from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { vendorValidationSchema } from '@/app/validators/vendor';
import { VendorProps } from '@/app/interface/vendor';
import { uploadLogoToCloudinary } from '@/app/services/upload';
import { updateVendorDetails } from '@/app/services/vendor';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';

const VendorForm = ({ initialValues }: { initialValues?: VendorProps }) => {
    const [vendor, setVendor] = useState<VendorProps>({
        businessName: initialValues?.businessName || '',
        email: initialValues?.email || '',
        phoneNumber: initialValues?.phoneNumber || '',
        address: initialValues?.address || '',
        city: initialValues?.city || '',
        state: initialValues?.state || '',
        country: initialValues?.country || '',
        description: initialValues?.description || '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [file, setFile] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const onDrop = useCallback((acceptedFiles: (Blob | MediaSource)[]) => {
        if (acceptedFiles?.length) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const removeFile = () => {
        setFile(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            'image/*': [],
        },
    });
    const handleValueChange: ChangeEventHandler<
        HTMLInputElement | HTMLTextAreaElement
    > = (event: ChangeEvent<HTMLInputElement>) => {
        setVendor({
            ...vendor,
            [event.target.name]: event.target.value,
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        vendorValidationSchema
            .validate(vendor, { abortEarly: false })
            .then(async () => {
                setErrors({});

                try {
                    setIsLoading(true);

                    const uploadedLogoUrl = await uploadLogoToCloudinary(file);

                    const { status, message, data } = await updateVendorDetails(
                        vendor,
                        uploadedLogoUrl
                    );
                    if (status !== 200) {
                        toast.error(message);
                        setIsLoading(false);
                        return;
                    }
                    toast.success(message);
                    setIsLoading(false);
                    router.push('/settings/vendor-information');
                } catch (error) {
                    toast.error('Unable to process form submission');
                    setIsLoading(false);
                    return;
                }
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
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-6 w-full" {...getRootProps()}>
                <label className="flex flex-col space-y-2">
                    <span>Upload logo</span>
                    <input {...getInputProps()} name="logo" />
                    {isDragActive ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-[100px] h-[100px]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-[100px] h-[100px]"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                    )}
                </label>
            </div>

            {file && (
                <div className="mt-3">
                    <div className="w-40 flex items-center p-2">
                        <Image
                            src={URL.createObjectURL(file)}
                            width={50}
                            height={50}
                            className="inline-block w-auto h-auto"
                            alt={`${file.name}`}
                        />
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer text-red-700"
                                onClick={removeFile}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                            </svg>
                        </div>
                        <div></div>
                    </div>
                </div>
            )}
            <div className="grid xl:grid-cols-2 gap-6">
                <div className="">
                    <Label className="mb-2 text-sm">Business Name</Label>
                    <Input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        readOnly
                        className="text-sm outline-none bg-transparent"
                        value={vendor.businessName}
                        onChange={handleValueChange}
                    />
                </div>
                <div className="">
                    <Label className="mb-2 text-sm">Email Address</Label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="vendor@gmail.com"
                        readOnly
                        value={vendor.email}
                        className="text-sm outline-none bg-transparent"
                        onChange={handleValueChange}
                    />
                </div>
                <div className="">
                    <Label className="mb-2 text-sm">Phone Number</Label>
                    <Input
                        type="tel"
                        name="phoneNumber"
                        placeholder="0906428263"
                        maxLength={11}
                        value={vendor.phoneNumber}
                        className="text-sm outline-none bg-transparent"
                        onChange={handleValueChange}
                    />
                    {errors.phoneNumber && (
                        <span className="text-red-500 text-sm">
                            {errors.phoneNumber}
                        </span>
                    )}
                </div>
                <div className="">
                    <Label className="mb-2 text-sm">Address</Label>
                    <Input
                        type="text"
                        name="address"
                        placeholder="23, Obalande Street"
                        className="text-sm outline-none bg-transparent"
                        value={vendor.address}
                        onChange={handleValueChange}
                    />
                    {errors.address && (
                        <span className="text-red-500 text-sm">
                            {errors.address}
                        </span>
                    )}
                </div>
                <div className="">
                    <Label className="mb-2 text-sm">City</Label>
                    <Input
                        type="text"
                        name="city"
                        placeholder="PortHarcourt"
                        className="text-sm outline-none bg-transparent"
                        value={vendor.city}
                        onChange={handleValueChange}
                    />
                    {errors.city && (
                        <span className="text-red-500 text-sm">
                            {errors.city}
                        </span>
                    )}
                </div>
                <div className="">
                    <Label className="mb-2 text-sm">State</Label>
                    <Input
                        type="text"
                        name="state"
                        placeholder="Anambra"
                        className="text-sm outline-none bg-transparent"
                        value={vendor.state}
                        onChange={handleValueChange}
                    />
                    {errors.state && (
                        <span className="text-red-500 text-sm">
                            {errors.state}
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-4">
                <Label className="mb-2 text-sm">Country</Label>
                <Input
                    type="text"
                    name="country"
                    placeholder="Nigeria"
                    className="text-sm outline-none w-full bg-transparent"
                    value={vendor.country}
                    onChange={handleValueChange}
                />
                {errors.country && (
                    <span className="text-red-500 text-sm">
                        {errors.country}
                    </span>
                )}
            </div>
            <div className="mt-6">
                <Label className="mb-2 text-sm">Business Description</Label>
                <Textarea
                    placeholder="Enter Business Description"
                    value={vendor.description}
                    onChange={(e) => {
                        setVendor({
                            ...vendor,
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
    );
};

export default VendorForm;
