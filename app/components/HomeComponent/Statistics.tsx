import { Card } from '@/components/ui/card';

const Statistics = () => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 mb-4">
            <Card className="p-4">
                <div className="flex justify-between">Total Sales</div>
                <p className="my-2 font-semibold text-xl">$67,676</p>
                <p>10% in the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex justify-between">Total Amount</div>
                <p className="my-2 font-semibold text-xl">$67,676</p>
                <p>10% in the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex justify-between">Total Products</div>
                <p className="my-2 font-semibold text-xl">$67,676</p>
                <p>10% in the last month</p>
            </Card>
            <Card className="p-4">
                <div className="flex justify-between">Total Customers</div>
                <p className="my-2 font-semibold text-xl">$67,676</p>
                <p>10% in the last month</p>
            </Card>
        </div>
    );
};

export default Statistics;
