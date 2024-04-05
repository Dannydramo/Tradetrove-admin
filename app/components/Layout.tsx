'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getVendorDetails } from '../services/vendor';
import { VendorStore } from '../store/vendorStore';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [mobileToggle, setMobileToggle] = useState(false);
    const pathname = usePathname();
    const { vendor, setVendor } = VendorStore();

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const { message, data, status } = await getVendorDetails();
                if (status !== 200) {
                    console.log(message);
                }

                setVendor(data);
            } catch (error) {
                console.log('Unable to fetch user details');
            }
        };
        fetchVendorDetails();
    }, []);

    return (
        <section className="flex w-full min-h-screen bg-[#F6F8FF]">
            <aside
                className={`z-20 lg:block top-0 left-0 lg:fixed w-64 p-4 h-full bg-white text-black ${
                    mobileToggle ? 'fixed' : 'hidden'
                }`}
            >
                <div className="flex flex-col flex-grow pt-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5 absolute top-0 right-0 m-4 lg:hidden"
                        onClick={() => {
                            setMobileToggle(false);
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                    <h1 className="">Logo</h1>
                </div>
                <div className="mt-8">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href={'/'}
                            className={`flex items-center font-medium space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
                                pathname === '/' && 'bg-[#4F80E1] text-white'
                            }`}
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                    />
                                </svg>
                            </span>
                            <span>Home</span>
                        </Link>
                        <Link
                            href={'/orders'}
                            className={`flex items-center font-medium space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
                                pathname === '/orders' &&
                                'bg-[#4F80E1] text-white'
                            }`}
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                                    />
                                </svg>
                            </span>
                            <span>Orders</span>
                        </Link>
                        <Link
                            href={'/products'}
                            className={`flex items-center font-medium space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
                                pathname.includes('/products' || 'product') &&
                                'bg-[#4F80E1] text-white'
                            }`}
                        >
                            Products
                        </Link>
                        <Link
                            href={'/settings/vendor-information'}
                            className={`flex items-center font-medium space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
                                pathname.includes('/settings') &&
                                'bg-[#4F80E1] text-white'
                            }`}
                        >
                            <span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-4 h-5 mr-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                </svg>
                            </span>
                            <span>Settings</span>
                        </Link>
                    </nav>
                </div>
                <div className="absolute bottom-0">
                    <Link
                        href={'/dashboard'}
                        className={`flex items-center font-medium space-x-2 px-6 py-3 rounded-md  ${
                            pathname === '/dashboard' &&
                            'bg-[#4F80E1] text-white'
                        }`}
                    >
                        Logout
                    </Link>
                </div>
            </aside>
            <div className="w-full flex-1 lg:ml-64 overflow-x-hidden">
                <header className="flex items-center h-16 px-4 py-2 sm:py-4 sm:px-6 bg-white border-b w-full border-gray-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 lg:hidden"
                            onClick={() => {
                                setMobileToggle(true);
                            }}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="">
                            <h1 className="text-lg sm:text-xl font-bold">
                                Welcome {vendor?.businessName}
                            </h1>
                        </div>
                        <div className="">
                            <h1>Monday 12th July</h1>
                        </div>
                    </div>
                </header>
                <main>{children}</main>
            </div>
        </section>
    );
};

export default Layout;
