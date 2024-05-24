'use client';
import { getVendorStatistics } from '@/app/services/vendor';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const Statistics = () => {
    const [statisticsText, setStatisticsText] = useState({
        totalProducts: 0,
        totalSales: 0,
        totalUsers: 0,
    });
    useEffect(() => {
        const fetchVendorStatistics = async () => {
            const { status, data } = await getVendorStatistics();
            if (status !== 200) {
                return;
            }

            setStatisticsText(data);
        };
        fetchVendorStatistics();
    }, []);

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 my-8">
            <Card className="p-4">
                <div className="flex gap-2 items-center">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </span>
                    <span>Total Sales</span>
                </div>
                <p className="my-2 font-semibold text-xl">
                    ₦{statisticsText.totalSales}
                </p>
            </Card>
            <Card className="p-4">
                <div className="flex gap-2 items-center">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            viewBox="0 0 24 25"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M5.23077 10.1667H18.7692M5.23077 10.1667V18.3333C5.23077 18.6427 5.36044 18.9395 5.59125 19.1583C5.82207 19.377 6.13511 19.5 6.46154 19.5H17.5385C17.8649 19.5 18.178 19.377 18.4087 19.1583C18.6395 18.9395 18.7692 18.6427 18.7692 18.3333V10.1667M5.23077 10.1667C4.55103 10.1667 4 9.64433 4 9V6.66667C4 6.02234 4.55103 5.5 5.23077 5.5H18.7692C19.449 5.5 20 6.02234 20 6.66667V9C20 9.64433 19.449 10.1667 18.7692 10.1667M10.1538 13.6667H13.8462"
                                strokeWidth="1.42857"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    </span>
                    <span>Total Products</span>
                </div>
                <p className="my-2 font-semibold text-xl">
                    {statisticsText.totalProducts}
                </p>
            </Card>
            <Card className="p-4">
                <div className="flex gap-2 items-center">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                            />
                        </svg>
                    </span>
                    <span>Total Customers</span>
                </div>
                <p className="my-2 font-semibold text-xl">
                    {statisticsText.totalUsers}
                </p>
            </Card>
        </div>
    );
};

export default Statistics;
