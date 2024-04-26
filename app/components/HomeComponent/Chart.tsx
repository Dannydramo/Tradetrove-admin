'use client';
import { getChartData } from '@/app/services/vendor';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Chart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        amounts: [],
    });

    useEffect(() => {
        const fetchChartData = async () => {
            const { status, data } = await getChartData();
            if (status !== 200) {
                return;
            }
            console.log(data);

            setChartData(data);
        };
        fetchChartData();
    }, []);

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Sales',
                data: chartData.amounts,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    };

    const options = {
        elements: {
            line: {
                tension: 0.5,
                borderWidth: 2,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: true,
            },
        },
    };

    return (
        <div className="bg-white p-8 rounded-md">
            <h2>Sales Chart</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default Chart;
