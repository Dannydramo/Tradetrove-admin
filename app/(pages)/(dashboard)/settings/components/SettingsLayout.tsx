'use client';
import Layout from '@/app/components/Layout';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    return (
        <>
            <Layout>
                <section className="lg:col-span-1 px-4 sm:px-6 mt-6">
                    <h1 className="font-bold mb-2 text-base sm:text-xl">
                        Settings
                    </h1>
                    <p className="text-sm">Manage your account settings</p>

                    <div className="bg-white rounded-md my-6 p-4 md:p-8 overflow-x-auto">
                        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row w-full">
                            <div className="md:min-w-80 md:max-w-90 pr-8 flex flex-row md:flex-col md:space-y-6 gap-2 font-semibold h-full">
                                <Link
                                    href={'/settings/vendor-information'}
                                    className={`flex items-center font-medium text-xs sm:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                        pathname.includes('vendor') &&
                                        'bg-[#F6F8FF] text-[#4F80E1]'
                                    }`}
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 sm:mr-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                            />
                                        </svg>
                                    </span>
                                    <span> Vendor Information</span>
                                </Link>
                                <Link
                                    href={'/settings/security'}
                                    className={`flex items-center font-medium text-xs sm:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md  ${
                                        pathname === '/settings/security' &&
                                        'bg-[#F6F8FF] text-[#4F80E1]'
                                    }`}
                                >
                                    <span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 sm:mr-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                            />
                                        </svg>
                                    </span>
                                    <span>Security</span>
                                </Link>
                            </div>
                            <hr className="" />
                            {children}
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    );
};

export default SettingsLayout;
