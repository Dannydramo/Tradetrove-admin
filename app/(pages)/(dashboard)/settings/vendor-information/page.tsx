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
                        <div className="w-[70px] h-[70px]">
                            <Image
                                src={vendor?.logo!}
                                width={70}
                                height={70}
                                loading="lazy"
                                alt="Vendor Logo"
                                className="w-full h-full rounded-full"
                            />
                        </div>
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
                            <span>{vendor?.phoneNumber}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Address:
                            </span>
                            <span>{vendor?.address}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                City:
                            </span>
                            <span>{vendor?.city}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                State:
                            </span>
                            <span>{vendor?.state}</span>
                        </p>
                        <p>
                            <span className="text-sm sm:text-base font-semibold mr-2">
                                Country:
                            </span>
                            <span>{vendor?.country}</span>
                        </p>
                    </div>
                </main>
            </SettingsLayout>
        </>
    );
};

export default PersonalInformation;
