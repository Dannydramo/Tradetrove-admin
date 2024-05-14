'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getVendorDetails } from '../services/vendor';
import { VendorStore } from '../store/vendorStore';
import { Button } from '@/components/ui/button';
import { deleteCookie } from 'cookies-next';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [mobileToggle, setMobileToggle] = useState(false);
    const pathname = usePathname();
    const { vendor, setVendor } = VendorStore();
    const router = useRouter();
    const requiredFields = [
        'businessName',
        'email',
        'phoneNumber',
        'address',
        'city',
        'state',
        'country',
    ];

    const isDetailsIncomplete = requiredFields.some(
        (field) => !vendor?.[field]
    );

    useEffect(() => {
        const fetchVendorDetails = async () => {
            try {
                const { message, data, status } = await getVendorDetails();
                if (status !== 200) {
                    return;
                }

                setVendor(data);
            } catch (error) {
                console.log('Unable to fetch user details');
            }
        };
        fetchVendorDetails();
    }, []);

    const handleLogout = () => {
        deleteCookie('token');
        router.replace('/login');
    };

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
                    <div className="pl-4 flex space-x-2 text-[#4F80E1]">
                        <div className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 absolute -top-2 left-2 z-50"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                                />
                            </svg>
                        </div>
                        <h1>Tradetrove</h1>
                    </div>
                </div>
                <div className="mt-8">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href={'/'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
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
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
                                pathname === '/orders' &&
                                'bg-[#4F80E1] text-white'
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="flex-shrink-0 w-5 h-5 mr-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                            <span>Orders</span>
                        </Link>
                        <Link
                            href={'/products'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
                                pathname.includes('/products' || 'product') &&
                                'bg-[#4F80E1] text-white'
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-6 mr-4"
                                viewBox="0 0 24 25"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    d="M5.23077 10.1667H18.7692M5.23077 10.1667V18.3333C5.23077 18.6427 5.36044 18.9395 5.59125 19.1583C5.82207 19.377 6.13511 19.5 6.46154 19.5H17.5385C17.8649 19.5 18.178 19.377 18.4087 19.1583C18.6395 18.9395 18.7692 18.6427 18.7692 18.3333V10.1667M5.23077 10.1667C4.55103 10.1667 4 9.64433 4 9V6.66667C4 6.02234 4.55103 5.5 5.23077 5.5H18.7692C19.449 5.5 20 6.02234 20 6.66667V9C20 9.64433 19.449 10.1667 18.7692 10.1667M10.1538 13.6667H13.8462"
                                    stroke-width="1.42857"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                ></path>
                            </svg>
                            <span> Products</span>
                        </Link>
                        <Link
                            href={'/settings/vendor-information'}
                            className={`flex items-center font-medium text-xs sm:text-base space-x-2 px-6 py-3 rounded-md transition-all duration-700 hover:bg-[#4F80E1] hover:text-white  ${
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
                        <Link
                            href={'/chat'}
                            className={`flex items-center font-medium text-xs sm:text-sm md:text-base hover:bg-[#F6F8FF] hover:text-[#4F80E1] space-x-2 px-6 py-3 rounded-md`}
                        >
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
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                </svg>
                            </span>
                            <span>Messages</span>
                        </Link>
                    </nav>
                </div>
                <div className="absolute bottom-0">
                    <Button
                        className="bg-transparent text-black hover:bg-transparent flex gap-3 w-full"
                        onClick={handleLogout}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                id="Vector"
                                d="M11.8571 13V15.2857C11.8571 15.5888 11.7367 15.8796 11.5224 16.0938C11.3081 16.3081 11.0174 16.4286 10.7143 16.4286H2.71427C2.41116 16.4286 2.12047 16.3081 1.90615 16.0938C1.69182 15.8796 1.57141 15.5888 1.57141 15.2857V2.7143C1.57141 2.41119 1.69182 2.1205 1.90615 1.90618C2.12047 1.69185 2.41116 1.57144 2.71427 1.57144H10.7143C11.0174 1.57144 11.3081 1.69185 11.5224 1.90618C11.7367 2.1205 11.8571 2.41119 11.8571 2.7143V5.00001M8.42855 9.00001H16.4286M16.4286 9.00001L14.1428 6.7143M16.4286 9.00001L14.1428 11.2857"
                                stroke-width="1.43"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                        Logout
                    </Button>
                </div>
            </aside>
            <div className="w-full flex-1 lg:ml-64 overflow-x-hidden">
                <header className="flex items-center h-16 px-4 py-2 sm:py-4 sm:px-6 border-b w-full border-gray-200">
                    <div className="">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mr-2 lg:hidden"
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
                            <h1 className="text-sm sm:text-xl font-bold">
                                {vendor?.businessName}
                            </h1>
                        </div>
                        <div className="text-sm">
                            <h1>Monday 12th July</h1>
                        </div>
                    </div>
                </header>
                {isDetailsIncomplete && (
                    <div className="bg-red-400 text-[10px] text-white text-center py-1">
                        Please fill in all your details in the settings page.
                    </div>
                )}
                <main>{children}</main>
            </div>
        </section>
    );
};

export default Layout;
