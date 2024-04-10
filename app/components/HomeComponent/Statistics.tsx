'use client';
import { getVendorStatistics } from '@/app/services/vendor';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const Statistics = () => {
    const [statisticsText, setStatisticsText] = useState({
        totalAmount: 0,
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-4">
            <Card className="p-4">
                <div className="flex justify-between">Total Sales</div>
                <p className="my-2 font-semibold text-xl">
                    {statisticsText.totalSales}
                </p>
                <p>10% in the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex justify-between">Total Amount</div>
                <p className="my-2 font-semibold text-xl">
                    ${statisticsText.totalAmount}
                </p>
                <p>10% in the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex justify-between">Total Products</div>
                <p className="my-2 font-semibold text-xl">
                    {statisticsText.totalProducts}
                </p>
                <p>10% in the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex justify-between">Total Customers</div>
                <p className="my-2 font-semibold text-xl">
                    {statisticsText.totalUsers}
                </p>
                <p>10% in the last month</p>
            </Card>
        </div>
    );
};

export default Statistics;
