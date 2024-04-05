'use client';
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
    const data = {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
        ],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
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
