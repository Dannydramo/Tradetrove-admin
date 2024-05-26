'use client';
import Link from 'next/link';
import SettingsLayout from '../components/SettingsLayout';
import { VendorStore } from '@/app/store/vendorStore';
import Image from 'next/image';

const PersonalInformation = () => {
    const { vendor } = VendorStore();
    return (
        <>
            <SettingsLayout>
                <main className="md:px-8 w-full md:border-l">
                    <div className="border-b pb-4 flex justify-between items-center">
                        <h1 className="text-base sm:text-xl font-bold">
                            Vendor Information
                        </h1>
                        <Link
                            href={'/settings/update-vendor-information'}
                            className="text-sm bg-[#4F80E1] text-white py-2 px-8 rounded-md"
                        >
                            Edit
                        </Link>
                    </div>
                    <div className="mt-4 flex flex-col space-y-4 text-sm">
                        {vendor && (
                            <div className="w-[70px] h-[70px]">
                                {vendor?.logo ? (
                                    <Image
                                        src={vendor.logo}
                                        width={70}
                                        height={70}
                                        loading="lazy"
                                        alt="Vendor Logo"
                                        className="w-full h-full rounded-full"
                                    />
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-full h-full rounded-full"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                )}
                            </div>
                        )}
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Business Name:
                            </span>
                            <span>{vendor?.businessName}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Email:
                            </span>
                            <span>{vendor?.email}</span>
                        </p>

                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Phone Number:
                            </span>
                            <span>{vendor?.phoneNumber || 'N/A'}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Address:
                            </span>
                            <span>{vendor?.address || 'N/A'}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                City:
                            </span>
                            <span>{vendor?.city || 'N/A'}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                State:
                            </span>
                            <span>{vendor?.state || 'N/A'}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Country:
                            </span>
                            <span>{vendor?.country || 'N/A'}</span>
                        </p>
                    </div>
                </main>
            </SettingsLayout>
        </>
    );
};

export default PersonalInformation;
